using Microsoft.AspNet.Identity.EntityFramework;

namespace EmployeeManager.DataAccess.Entities
{
    public class User : IdentityUser
    {
        public string Email { get; set; }
    }
}
