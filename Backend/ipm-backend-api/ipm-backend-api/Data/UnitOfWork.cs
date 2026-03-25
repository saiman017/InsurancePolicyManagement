using ipm_backend_api.Data.Contracts;
using ipm_backend_api.Policies;
using ipm_backend_api.Policies.Contracts;

namespace ipm_backend_api.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PolicyDbContext _db;

        public UnitOfWork(PolicyDbContext db)
        {
            _db = db;
            Policies = new PolicyRepository(db);    
        }

        public IPolicyRepository Policies { get; private set; }

        public async Task<string> SaveAsync()
        {
            try
            {
                var result = await _db.SaveChangesAsync();
                if (result > 0)
                {
                    return "Save successful";
                }
                else if (result == 0)
                {
                    return "No changes were saved";
                }
                else
                {
                    return "Save operation encountered an error";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        
    }
}
