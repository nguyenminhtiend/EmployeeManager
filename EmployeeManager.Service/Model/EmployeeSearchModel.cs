using System;

namespace EmployeeManager.Service.Model
{
    public class EmployeeSearchModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public string Avatar { get; set; }
        public string Department { get; set; }
    }
}
