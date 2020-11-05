using System;

namespace DatingApp.api.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; } // Use PublicId to match the data returend from cloudinary
        public User User { get; set; } // by adding this, insted of having a restriced delete we now have a cascade delete.
        public int UserId { get; set; } // by adding this, insted of having a restriced delete we now have a cascade delete (which mean user was to be deleted then our photos would also be deleted).
    }
}