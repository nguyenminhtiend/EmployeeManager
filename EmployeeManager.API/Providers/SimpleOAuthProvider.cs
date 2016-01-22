using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployeeManager.DataAccess.DataContext;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;

namespace EmployeeManager.API.Providers
{
    public class SimpleOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            using (var manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(new EmployeeContext())))
            {
                var user = await manager.FindAsync(context.UserName, context.Password);
                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
                
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Email, context.UserName));
                var identityUserRole = user.Roles.FirstOrDefault();
                if (identityUserRole != null)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, identityUserRole.Role.Name));
                }
                context.Validated(identity);
            }
        }
    }
}