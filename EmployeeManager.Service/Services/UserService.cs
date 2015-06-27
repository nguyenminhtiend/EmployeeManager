using EmployeeManager.DataAccess.Entities;
using EmployeeManager.DataAccess.Repositories;
using EmployeeManager.DataAccess.UnitOfWork;
using EmployeeManager.DataAccess.Utility;
using EmployeeManager.Service.Model;
using EmployeeManager.Service.Services.Contracts;
using EmployeeManager.Service.Utility;

namespace EmployeeManager.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<User> userRepository;
        public UserService(IUnitOfWork unitOfWork, IGenericRepository<User> userRepository)
        {
            this.unitOfWork = unitOfWork;
            this.userRepository = userRepository;
        }
        public bool Register(UserModel userModel)
        {
            userRepository.Add(new User
            {
                Email = userModel.Email,
                PasswordHash = PasswordHashHelper.HashPassword(userModel.Password)
            });
            return unitOfWork.Commit();
        }
    }
}
