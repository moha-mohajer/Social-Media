
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
        public UsersController(IDatingRepository repo,IMapper mapper)
        {
            _mapper = mapper; //Using AutoMapper
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users); // Replace maper to hide some data on returning user data

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
    }
}