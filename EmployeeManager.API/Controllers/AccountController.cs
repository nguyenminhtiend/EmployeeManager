using System.Web.Http;
using EmployeeManager.Service.Model;
using EmployeeManager.Service.Services.Contracts;

namespace EmployeeManager.API.Controllers
{
    public class AccountController : ApiController
    {
        private readonly IUserService userService;
        public AccountController(IUserService userService)
        {
            this.userService = userService;
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult Register(UserModel userModel)
        {
            if (userService.Register(userModel))
            {
                return Ok();    
            }
            return BadRequest();
        }

    }
}