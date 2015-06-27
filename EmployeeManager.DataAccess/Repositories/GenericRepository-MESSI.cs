using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using EmployeeManager.DataAccess.Entities;
using EmployeeManager.DataAccess.UnitOfWork;

namespace EmployeeManager.DataAccess.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DbContext dbContext;

        public GenericRepository(IUnitOfWork unitOfWork)
        {
            dbContext = unitOfWork.Context;
        }
        public IQueryable<TEntity> GetAll()
        {
            return dbContext.Set<TEntity>();
        }

        public TEntity GetOne(Expression<Func<TEntity, bool>> predicate)
        {
            return dbContext.Set<TEntity>().FirstOrDefault(predicate);
        }
        public IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            return dbContext.Set<TEntity>().Where(predicate);
        }
        public void Add(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
        }
        public void Delete(int id)
        {
            var item = dbContext.Set<TEntity>().Find(id);
            dbContext.Set<TEntity>().Remove(item);
        }
        public void Update(TEntity entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Dispose()
        {
            if (dbContext != null)
            {
                dbContext.Dispose();
            }
        }
    }
}
