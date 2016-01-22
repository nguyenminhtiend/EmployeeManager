using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using EmployeeManager.DataAccess.Entities;
using EmployeeManager.DataAccess.Utility.Constant;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EmployeeManager.DataAccess.DataContext
{
    public class EmployeeContextInitializer : DropCreateDatabaseIfModelChanges<EmployeeContext>
    {
        protected override void Seed(EmployeeContext context)
        {
            var listDepartment = new List<Department>
            {
                new Department{Name = "IT"},
                new Department{Name = "HR"},
                new Department{Name = "Software Development"},
                new Department{Name = "BPO"}
            };

            string[] employeeNames = 
            { 
                "Marcus,HighTower,acmecorp.com", 
                "Jesse,Smith,gmail.com", 
                "Albert,Einstein,outlook.com", 
                "Dan,Wahlin,yahoo.com", 
                "Ward,Bell,gmail.com", 
                "Brad,Green,gmail.com", 
                "Igor,Minar,gmail.com", 
                "Miško,Hevery,gmail.com", 
                "Michelle,Avery,acmecorp.com", 
                "Heedy,Wahlin,hotmail.com",
                "Thomas,Martin,outlook.com",
                "Jean,Martin,outlook.com",
                "Robin,Cleark,acmecorp.com",
                "Juan,Paulo,yahoo.com",
                "Gene,Thomas,gmail.com",
                "Pinal,Dave,gmail.com",
                "Fred,Roberts,outlook.com",
                "Tina,Roberts,outlook.com",
                "Cindy,Jamison,gmail.com",
                "Robyn,Flores,yahoo.com",
                "Jeff,Wahlin,gmail.com",
                "Danny,Wahlin,gmail.com",
                "Elaine,Jones,yahoo.com"
            };
            var random = new Random();
            for (int i = 0; i < employeeNames.Count(); i++)
            {
                var employee = employeeNames[i].Split(',');
                context.Employees.Add(new Employee
                {
                    FirstName = employee[0],
                    LastName = employee[1],
                    Email = string.Format("{0}{1}@{2}", employee[0], employee[1], employee[2]),
                    Birthday = RandomDate(random),
                    Department = listDepartment[i % 4],
                    Phone = GetRandomTelNo(random)
                });
            }

            var userManager = new UserManager<User>(new UserStore<User>(context));
            userManager.Create(new User { UserName = "admin", Email = "admin@gmail.com" }, "111111");
            userManager.Create(new User { UserName = "user", Email = "user@gmail.com" }, "111111");

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            roleManager.Create(new IdentityRole(Role.Admin));
            roleManager.Create(new IdentityRole(Role.User));
            
            context.SaveChanges();
            base.Seed(context);
        }
        private DateTime RandomDate(Random random)
        {

            var start = new DateTime(1980, 1, 1);
            var end = new DateTime(1990, 1, 1);
            int range = (end - start).Days;
            return start.AddDays(random.Next(range));
        }
        private string GetRandomTelNo(Random random)
        {
            var telNo = new StringBuilder(12);
            int number;
            for (int i = 0; i < 3; i++)
            {
                number = random.Next(0, 8);
                telNo = telNo.Append(number.ToString());
            }
            telNo = telNo.Append(" ");
            number = random.Next(0, 743);
            telNo = telNo.Append(String.Format("{0:D3}", number));
            telNo = telNo.Append(" ");
            number = random.Next(0, 10000);
            telNo = telNo.Append(String.Format("{0:D4}", number));
            return telNo.ToString();
        }
    }
}