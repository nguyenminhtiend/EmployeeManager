using System.Collections.Generic;

namespace EmployeeManager.DataAccess.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<UserRole> Roles { get; set; }
    }
}
