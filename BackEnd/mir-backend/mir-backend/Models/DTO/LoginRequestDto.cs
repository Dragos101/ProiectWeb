using System.ComponentModel.DataAnnotations;

namespace mir_backend.Models.DTO
{
    public class LoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
