﻿using mir_backend.Models.DTO;

namespace mir_backend.Repositories.Interface
{
    public interface IMigrationRepository
    {
        Task<string> getAllAsync();

        Task<string> getUserMigrations(Guid userId);

        Task<string> deleteMigration(Guid migrationId);

        Task<string> createMigration(MigrationDto migration, MigrationContextDto mc, MigrationTypeDto mt, MigrationLocationDto ml);
    }
}
