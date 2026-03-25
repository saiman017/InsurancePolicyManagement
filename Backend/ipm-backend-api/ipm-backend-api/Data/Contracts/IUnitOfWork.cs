using ipm_backend_api.Policies.Contracts;

namespace ipm_backend_api.Data.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        IPolicyRepository Policies { get; }

        Task<string> SaveAsync();
    }
}
