using System.Threading.Tasks;
using DatingApp.api.Models;

namespace DatingApp.api.Data
{
    public interface IAuthRrepository
    {
         Task <User> Register (User user, string password);
         
         Task <User> Login (string username, string password);

         Task <bool> UserExists (string username);
    }
}