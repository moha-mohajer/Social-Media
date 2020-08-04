using System.Threading.Tasks;
using DatingApp.api.Data;
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
        public async Task<IActionResult> Register (string username, string password)
        {
            // validation request

            username = username.ToLower();
            if(await _repo.UserExists(username))  
                return BadRequest ("Username already exists");

                var userToCreate = new User
                {
                    Username = username
                };

                var createdUser = await _repo.Register(userToCreate, password);

                // Return the status code of craeated at roots
                return StatusCode(201);   
                // return CreatedAtRoute();
        }
    }
}