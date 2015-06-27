using System.Collections.Generic;
using EmployeeManager.DataAccess.Entities;
using EmployeeManager.Service.Model;

namespace EmployeeManager.Service.Services.Contracts
{
    public interface IEmployeeService
    {
        Employee GetEmployeeDetail(int id);
        IList<EmployeeSearchModel> GetEmployeeByCriteriaList(CriteriaSearch criteriaSearch, out int total);
        IList<DropDownListModel> GetDepartments();
        bool Insert(Employee employee);
        bool Update(Employee employee);
        bool Delete(int id);
        bool CheckEmailExist(int id, string email);
    }
}
