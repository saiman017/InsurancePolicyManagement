namespace ipm_backend_api.Policies.Contracts
{
    public interface IPolicyRepository
    {
        Task<Policy> AddAsync(Policy policy);

        Task<Policy> UpdateAsync(Policy policy);

        Task<Policy> GetByIdAsync(Guid id);

        Task<List<Policy>> GetAllAsync();
    }
}
