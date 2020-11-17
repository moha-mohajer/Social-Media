using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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

        // Setting up the paging helper classes
        public static void AddPagination(this HttpResponse response, 
            int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, 
                totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings(); // Implementing pagination in the API,  to retur camel case
            camelCaseFormatter.ContractResolver = 
                new CamelCasePropertyNamesContractResolver(); // Implementing pagination in the API, to retur camel case
            response.Headers.Add("Pagination",
                JsonConvert.SerializeObject(
                    paginationHeader, camelCaseFormatter // Implementing pagination in the API, to retur camel case
                    ));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
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
