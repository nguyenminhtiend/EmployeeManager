using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Http;
using EmployeeManager.DataAccess.Entities;
using EmployeeManager.DataAccess.Utility.Constant;
using EmployeeManager.Service.Model;
using EmployeeManager.Service.Services.Contracts;

namespace EmployeeManager.API.Controllers
{
    public class EmployeeController : ApiController
    {
        private readonly IEmployeeService employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }
        [Route("api/employee/getDepartments")]
        public IEnumerable<DropDownListModel> GetAllDepartments()
        {
            return employeeService.GetDepartments();
        }
        [AllowAnonymous]
        public IHttpActionResult GetEmployeesByCriteria([FromUri]CriteriaSearch criteriaSearch)
        {
            int total;
            var result = employeeService.GetEmployeeByCriteriaList(criteriaSearch, out total);

            var data = new
            {
                listEmployee = result,
                totalItems = total
            };
            return Ok(data);
        }
        public IHttpActionResult GetEmployeeById(int id)
        {
            var employee = employeeService.GetEmployeeDetail(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        [HttpGet]
        public bool CheckUniqueEmail(int id, string email)
        {
            return !employeeService.CheckEmailExist(id, email);
        }
        [Authorize]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            if (employeeService.Insert(employee))
            {
                return Ok();
            }
            return BadRequest();
        }
        [Authorize]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            employee.Id = id;
            if (employeeService.Update(employee))
            {
                return Ok();
            }
            return NotFound();
        }
        [Authorize(Roles = Role.Admin)]
        public IHttpActionResult DeleteEmployee(int id)
        {
            if (employeeService.Delete(id))
            {
                return Ok();
            }
            return NotFound();
        }
        [HttpPost]
        [Route("api/employee/postImage")]
        public IHttpActionResult PostImage()
        {
            var httpRequest = HttpContext.Current.Request;
            var result = string.Empty;
            if (httpRequest.Files.Count > 0)
            {
                try
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        if (postedFile != null)
                        {
                            result = Guid.NewGuid() + Path.GetExtension(postedFile.FileName);
                            var filePath = HttpContext.Current.Server.MapPath("~/Resources/Images/" + result);
                            postedFile.SaveAs(filePath);
                        }
                    }
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return Ok(result);
        }
    }
}
