namespace mir_backend.Models.DTO
{
    public class MigrationContextDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Season { get; set; }
        public string Working { get; set; }
        public string PoliticFactors { get; set; }
        public string Calamity { get; set; }
        public string ThumbnailUri { get; set; }
    }
}
