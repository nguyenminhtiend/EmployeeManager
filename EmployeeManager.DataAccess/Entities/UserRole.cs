using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManager.DataAccess.Entities
{
    public class UserRole : BaseEntity
    {
        public string RoleName { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
