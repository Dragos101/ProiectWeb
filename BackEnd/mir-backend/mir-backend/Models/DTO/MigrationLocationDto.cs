﻿namespace mir_backend.Models.DTO
{
    public class MigrationLocationDto
    {
        public Guid Id { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}
