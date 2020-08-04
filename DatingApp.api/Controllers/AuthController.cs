using System.Threading.Tasks;
using DatingApp.api.Data;
using DatingApp.api.Dtos;
using DatingApp.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register (UserForRegisterDto  userForRegisterDto)
        {
            // validation request

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if(await _repo.UserExists(userForRegisterDto.Username))  
                return BadRequest ("Username already exists");

                var userToCreate = new User
                {
                    Username = userForRegisterDto.Username
                };

                var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

                // Return the status code of craeated at roots
                return StatusCode(201);   
                // return CreatedAtRoute();
        }
    }
}