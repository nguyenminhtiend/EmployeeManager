using System;
using System.Web.Http;
using Autofac;
using EmployeeManager.API.Providers;
using EmployeeManager.Service.Services.Contracts;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartup(typeof(EmployeeManager.API.Startup))]

namespace EmployeeManager.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureOAuth(app);
            var config = new HttpConfiguration();
            WebApiConfig.Register(config);
            app.UseCors(CorsOptions.AllowAll);
            Bootstrapper.Configure(config);
            app.UseWebApi(config);
        }
        public void ConfigureOAuth(IAppBuilder app)
        {
            var oAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new SimpleOAuthProvider()
            };

            app.UseOAuthAuthorizationServer(oAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            //FacebookAuthOptions = new FacebookAuthenticationOptions()
            //{
            //    AppId = "451770781657391",
            //    AppSecret = "d5cc4e95a9e6f3f4745394aa545eab85",
            //    Provider = new FacebookAuthProvider()
            //};
            //app.UseFacebookAuthentication(FacebookAuthOptions);
        }

    }
}
