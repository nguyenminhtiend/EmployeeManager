using System.ComponentModel.DataAnnotations;

namespace EmployeeManager.DataAccess.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public virtual int Id { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
