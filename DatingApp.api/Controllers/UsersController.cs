
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper; //Using AutoMapper
using DatingApp.api.Data;
using DatingApp.api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DatingApp.api.Helpers; //
using DatingApp.api.Models;

// Creating the Users Controller
namespace DatingApp.api.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))] // Using Action Filters
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper; //Using AutoMapper 
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper; //Using AutoMapper
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(
            [FromQuery] UserParams userParams // Implementing pagination in the API
            )
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); // Filtering in the API

            var userFromRepo = await _repo.GetUser(currentUserId); // Filtering in the API

            userParams.UserId = currentUserId; // Filtering in the API

            if (string.IsNullOrEmpty(userParams.Gender)) // Filtering in the API
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users); // Replace maper to hide some data on returning user data

            Response.AddPagination(users.CurrentPage, users.PageSize,
                 users.TotalCount, users.TotalPages); // Implementing pagination in the API

            return Ok(usersToReturn);
        }

        // [HttpGet("{id}")]
        [HttpGet("{id}", Name = "GetUser")] // Updating the Register method in the API
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user); // Replace maper to hide some data on returning user data

            return Ok(userToReturn);
        }

        // Use put to update 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            // If the user is corunt user 
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        // Adding the Send Like functionality in the API    
        
        [HttpPost("{id}/like/{recipientId}")]
         public async Task<IActionResult> LikeUser(int id, int recipientId)
         {
             if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                 return Unauthorized();

              var like = await _repo.GetLike(id, recipientId);

              if (like != null)
                 return BadRequest("You already like this user");

              if (await _repo.GetUser(recipientId) == null)
                 return NotFound();

              like = new Like
             {
                 LikerId = id,
                 LikeeId = recipientId
             };

              _repo.Add<Like>(like);

              if (await _repo.SaveAll())
                 return Ok();

              return BadRequest("Failed to like user");
         }
    }
}