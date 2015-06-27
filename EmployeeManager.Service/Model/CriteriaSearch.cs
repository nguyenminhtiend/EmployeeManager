namespace EmployeeManager.Service.Model
{
    public class CriteriaSearch
    {
        public string SearchTerm { get; set; }
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public string SortColumn { get; set; }
        public bool SortAscending { get; set; }
        public string SortDirection
        {
            get { return SortAscending ? "OrderBy" : "OrderByDescending"; }
        }
    }
}
