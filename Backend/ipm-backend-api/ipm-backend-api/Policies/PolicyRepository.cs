using ipm_backend_api.Data;
using ipm_backend_api.Policies.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ipm_backend_api.Policies
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly PolicyDbContext _db;
        internal DbSet<Policy> _dbSet;

        public PolicyRepository(PolicyDbContext context)
        {
            _db = context;
            _dbSet = _db.Set<Policy>();
        }

        public  async Task<Policy> AddAsync(Policy policy)
        {
            await _dbSet.AddAsync(policy);
            return policy;
        }

        public async Task<List<Policy>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Policy> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Policy> UpdateAsync(Policy policy)
        {
            _dbSet.Update(policy);
            return policy;
        }
    }
}
