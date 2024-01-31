namespace mir_backend.Repositories.Interface
{
    public interface IMigrationRepository
    {
        Task<string> getAllAsync();
    }
}
