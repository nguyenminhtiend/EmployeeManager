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
        private readonly IDbSet<TEntity> dbSet;
        private readonly DbContext context;
        public GenericRepository(IUnitOfWork unitOfWork)
        {
            context = unitOfWork.Context;
            dbSet = context.Set<TEntity>();
        }
        public IQueryable<TEntity> GetAll()
        {
            return dbSet;
        }

        public TEntity GetOne(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.FirstOrDefault(predicate);
        }
        public IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.Where(predicate);
        }
        public void Add(TEntity entity)
        {
            dbSet.Add(entity);
        }
        public void Update(TEntity entity)
        {
            context.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            var entity = dbSet.Find(id);
            context.Entry(entity).State = EntityState.Deleted;
        }
        public void Dispose()
        {
            if (context != null)
            {
                context.Dispose();
            }
        }
    }
}
