using System;
using System.Linq;
using System.Linq.Expressions;
using EmployeeManager.DataAccess.Entities;

namespace EmployeeManager.DataAccess.Repositories
{
    public interface IGenericRepository<TEntity> : IDisposable where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetAll();
        TEntity GetOne(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(int id);
        
    }
}
