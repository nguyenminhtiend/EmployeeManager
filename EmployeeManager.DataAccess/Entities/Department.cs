using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManager.DataAccess.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}