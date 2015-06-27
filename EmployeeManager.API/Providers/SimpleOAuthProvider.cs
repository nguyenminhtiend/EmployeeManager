using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployeeManager.DataAccess.DataContext;
using EmployeeManager.DataAccess.Utility;
using EmployeeManager.DataAccess.Utility.Constant;
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
            using (var db = new EmployeeContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Email.Equals(context.UserName));
                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
                if (!PasswordHashHelper.ValidatePassword(context.Password, user.PasswordHash))
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                var roles = db.UserRoles.Where(x => x.UserId.Equals(user.Id)).Select(x => x.RoleName).ToList();
                identity.AddClaim(new Claim(ClaimTypes.Email, context.UserName));

                identity.AddClaim(roles.Contains(Role.Admin)
                    ? new Claim(ClaimTypes.Role, Role.Admin)
                    : new Claim(ClaimTypes.Role, Role.User));
                context.Validated(identity);
            }
        }
    }
}