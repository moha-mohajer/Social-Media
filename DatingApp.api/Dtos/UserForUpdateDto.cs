namespace DatingApp.api.Dtos
{
    public class UserForUpdateDto
    {
        // property User allowed to edit
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
} 