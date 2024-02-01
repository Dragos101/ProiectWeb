using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using mir_backend.Models.DTO;
using mir_backend.Repositories.Interface;

namespace mir_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var identityUser = await userManager.FindByEmailAsync(request.Email);
            if (identityUser is not null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);

                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);
                    var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());
                    var response = new LoginResponseDto()
                    {
                        Id = identityUser.Id,
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password is incorrect");

            return ValidationProblem(ModelState);

        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            // create identity object
            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

            var identityResult = await userManager.CreateAsync(user, request.Password);

            if (identityResult.Succeeded)
            {
                // add role to user 
                identityResult = await userManager.AddToRoleAsync(user, "Writer");

                var roles = await userManager.GetRolesAsync(user);
                var jwtToken = tokenRepository.CreateJwtToken(user, roles.ToList());
                var response = new LoginResponseDto()
                {
                    Id = user.Id,
                    Email = request.Email,
                    Roles = roles.ToList(),
                    Token = jwtToken
                };

                if (identityResult.Succeeded)
                {
                    return Ok(response);
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach( var error in identityResult.Errors )
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }
    }
}
