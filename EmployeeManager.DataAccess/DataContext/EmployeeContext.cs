using System.Data.Entity;
using EmployeeManager.DataAccess.Entities;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EmployeeManager.DataAccess.DataContext
{
    public class EmployeeContext : IdentityDbContext<User>
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityUser>().ToTable("User");
            modelBuilder.Entity<User>().ToTable("User");

            modelBuilder.Entity<IdentityRole>().ToTable("Role");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRole");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaim");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogin");
        }
    }
}
