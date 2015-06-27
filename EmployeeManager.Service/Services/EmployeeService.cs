using System.Collections.Generic;
using System.Linq;
using EmployeeManager.DataAccess.Entities;
using EmployeeManager.DataAccess.Repositories;
using EmployeeManager.DataAccess.UnitOfWork;
using EmployeeManager.Service.Model;
using EmployeeManager.Service.Services.Contracts;
using EmployeeManager.Service.Utility;

namespace EmployeeManager.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Employee> employeeRepository;
        private readonly IGenericRepository<Department> departmentRepository;

        public EmployeeService(IUnitOfWork unitOfWork, IGenericRepository<Employee> employeeRepository, IGenericRepository<Department> departmentRepository)
        {
            this.unitOfWork = unitOfWork;
            this.employeeRepository = employeeRepository;
            this.departmentRepository = departmentRepository;
        }

        public Employee GetEmployeeDetail(int id)
        {
            return employeeRepository.GetOne(x => x.Id.Equals(id));
        }

        public IList<EmployeeSearchModel> GetEmployeeByCriteriaList(CriteriaSearch criteriaSearch, out int total)
        {
            var query = from employee in employeeRepository.GetAll()
                        join department in departmentRepository.GetAll() on employee.DepartmentId equals department.Id
                        select new EmployeeSearchModel
                        {
                            Id = employee.Id,
                            FirstName = employee.FirstName,
                            LastName = employee.LastName,
                            Birthday = employee.Birthday,
                            Email = employee.Email,
                            Phone = employee.Phone,
                            Department = department.Name,
                            Avatar = string.IsNullOrEmpty(employee.Avatar) ? "male.png" : employee.Avatar
                        };
            if (!string.IsNullOrEmpty(criteriaSearch.SearchTerm))
            {
                query = query.Where(x => x.FirstName.Contains(criteriaSearch.SearchTerm) || x.LastName.Contains(criteriaSearch.SearchTerm));
            }
            total = query.Count();

            query = query.OrderBy(criteriaSearch.SortColumn, criteriaSearch.SortDirection);

            return query.Skip((criteriaSearch.CurrentPage - 1) * criteriaSearch.ItemPerPage).Take(criteriaSearch.ItemPerPage).ToList();
        }

        public IList<DropDownListModel> GetDepartments()
        {
            var query = from deparment in departmentRepository.GetAll()
                        select new DropDownListModel
                        {
                            Value = deparment.Id,
                            Text = deparment.Name
                        };
            return query.ToList();
        }

        public bool Insert(Employee employee)
        {
            employeeRepository.Add(employee);
            return unitOfWork.Commit();
        }

        public bool Update(Employee employee)
        {
            employeeRepository.Update(employee);
            return unitOfWork.Commit();
        }

        public bool Delete(int id)
        {
            employeeRepository.Delete(id);
            return unitOfWork.Commit();
        }

        public bool CheckEmailExist(int id, string email)
        {
            var query = employeeRepository.FindBy(x => x.Email.Equals(email.Trim()));
            if (id > 0)
            {
                query = query.Where(x => x.Id != id);
            }
            return query.Any();
        }
    }
}
