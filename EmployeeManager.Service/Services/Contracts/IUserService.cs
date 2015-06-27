using EmployeeManager.Service.Model;

namespace EmployeeManager.Service.Services.Contracts
{
    public interface IUserService
    {
        bool Register(UserModel userModel);
    }
}
