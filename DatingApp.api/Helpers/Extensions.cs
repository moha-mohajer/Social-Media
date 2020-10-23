using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.api.Helpers
{
    // This class is sort of general purpuse extensions class that will use for any other extension methods we need in additon to list one now
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today)// If birtday not pass yet
                age--;

            return age;
        }
    }
} 
