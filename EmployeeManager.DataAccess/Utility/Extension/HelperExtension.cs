using System.ComponentModel;

namespace EmployeeManager.DataAccess.Utility.Extension
{
    public static class HelperExtension
    {
        public static string ToDescription<TEnum>(this TEnum e)
        {
            var fi = e.GetType().GetField(e.ToString());
            var attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return (attributes.Length > 0) ? attributes[0].Description : e.ToString();
        }
    }
}
