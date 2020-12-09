namespace DatingApp.api.Helpers
{
    // Setting up the paging helper classes
   public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; } // Filtering in the API
        public string Gender { get; set; } // Filtering in the API
        public int MinAge { get; set; } = 18; // Adding additional filtering parameters to the API
        public int MaxAge { get; set; } = 99; // Adding additional filtering parameters to the API
        public string OrderBy { get; set; }  // Sorting results in the API
        public bool Likees { get; set; } = false; // Retrieving the list of users liked and liked by user
        public bool Likers { get; set; } = false; // Retrieving the list of users liked and liked by user
    }
}