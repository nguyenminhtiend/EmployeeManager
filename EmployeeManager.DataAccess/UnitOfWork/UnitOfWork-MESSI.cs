using System;
using System.Data.Entity;

namespace EmployeeManager.DataAccess.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext dbContext;
        public UnitOfWork(DbContext dbContext)
        {

            this.dbContext = dbContext;
        }
        public bool Commit()
        {
            try
            {
                dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public DbContext Context
        {
            get { return dbContext; }
        }

        public void Dispose()
        {
            if (dbContext != null)
            {
                dbContext.Dispose();
            }
            GC.SuppressFinalize(this);
        }
    }
}
