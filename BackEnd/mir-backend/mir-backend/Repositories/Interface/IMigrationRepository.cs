namespace mir_backend.Repositories.Interface
{
    public interface IMigrationRepository
    {
        Task<string> getAllAsync();

        Task<string> getUserMigrations(Guid userId);

        Task<string> deleteMigration(Guid migrationId);
    }
}
