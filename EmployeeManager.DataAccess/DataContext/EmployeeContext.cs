using System.Data.Entity;
using EmployeeManager.DataAccess.Entities;

namespace EmployeeManager.DataAccess.DataContext
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext()
            : base("name=EmployeeManagerConnnectionString")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
            Configuration.AutoDetectChangesEnabled = false;
            Database.SetInitializer(new EmployeeContextInitializer());
        }
        public IDbSet<Department> Departments { get; set; }
        public IDbSet<Employee> Employees { get; set; }
        public IDbSet<User> Users { get; set; }
        public IDbSet<UserRole> UserRoles { get; set; }
    }
}
