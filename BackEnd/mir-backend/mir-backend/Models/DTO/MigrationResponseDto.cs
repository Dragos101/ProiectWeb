namespace mir_backend.Models.DTO
{
    public class MigrationResponseDto
    {
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public string Season { get; set; }
        public string Working { get; set; }
        public string PoliticFactors { get; set; }
        public string Calamity { get; set; }
        public string Category { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string ThumbnailUrl {  get; set; }

    }
}
