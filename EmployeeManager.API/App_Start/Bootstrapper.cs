using System.Data.Entity;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using EmployeeManager.DataAccess.DataContext;
using EmployeeManager.DataAccess.Repositories;
using EmployeeManager.DataAccess.UnitOfWork;
using log4net.Config;

namespace EmployeeManager.API
{
    public class Bootstrapper
    {
        public static void Configure(HttpConfiguration config)
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<EmployeeContext>().As<DbContext>().InstancePerRequest();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerRequest();

            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>)).InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(Assembly.Load("EmployeeManager.Service"))
                  .Where(x => x.Name.EndsWith("Service"))
                  .AsImplementedInterfaces()
                  .InstancePerLifetimeScope();

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
        private static void ConfigureLogging()
        {
            var config = HttpContext.Current.Server.MapPath("~/log4net.config");
            XmlConfigurator.Configure(new FileInfo(config));
        }
    }
}