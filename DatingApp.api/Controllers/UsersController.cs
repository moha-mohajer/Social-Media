
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper; //Using AutoMapper
using DatingApp.api.Data;
using DatingApp.api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// Creating the Users Controller
namespace DatingApp.api.Controllers
{
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user); // Replace maper to hide some data on returning user data

            return Ok(userToReturn);

        }
    }
}