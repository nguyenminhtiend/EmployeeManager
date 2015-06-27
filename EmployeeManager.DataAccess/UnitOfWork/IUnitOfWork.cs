using System;
using System.Data.Entity;

namespace EmployeeManager.DataAccess.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        bool Commit();
         DbContext Context { get; }
    }
}
