using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username {get; set;}

        [Required]
        [StringLength(8, MinimumLength= 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password {get; set;}
        
        [Required]
        public string Gender { get; set; } // Updating the Register method in the API

        [Required]
        public string KnownAs { get; set; } // Updating the Register method in the API

        [Required]
        public DateTime DateOfBirth { get; set; } // Updating the Register method in the API

        [Required]
        public string City { get; set; } // Updating the Register method in the API

        [Required]
        public string Country { get; set; } // Updating the Register method in the API
        public DateTime Created { get; set; } // Updating the Register method in the API
        public DateTime LastActive { get; set; } // Updating the Register method in the API

        public UserForRegisterDto() // Updating the Register method in the API
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
        
    }
}