using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.api.Models;
using DatingApp.api.Helpers;

namespace DatingApp.api.Data
{
    // Creating a new repository for our API
    public interface IDatingRepository
    {
        // simply create one method and we can specify the type and then save that particular resource back to our database.
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll(); // when we save our changes banks the database will be zero changes to save.
        //  Task<IEnumerable<User>> GetUsers();
         Task<PagedList<User>> GetUsers(UserParams userParams); //Implementing pagination in the API
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
         Task<Like> GetLike(int userId, int recipientId); // Adding the Send Like functionality in the API
    }
}