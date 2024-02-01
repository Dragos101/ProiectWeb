namespace mir_backend.Models.DTO
{
    public class LoginResponseDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public List<String> Roles { get; set; }
    }
}
