using Microsoft.AspNetCore.Identity;

namespace mir_backend.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<String> roles);
    }
}
