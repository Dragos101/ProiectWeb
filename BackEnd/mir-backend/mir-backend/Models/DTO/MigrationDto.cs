namespace mir_backend.Models.DTO
{
    public class MigrationDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid MigrationContextId { get; set; }
        public Guid MigrationLocationId { get; set; }
        public Guid MigrationTypeId { get; set; }
    }
}
