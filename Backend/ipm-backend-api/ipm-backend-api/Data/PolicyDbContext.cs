using ipm_backend_api.Policies;
using Microsoft.EntityFrameworkCore;

namespace ipm_backend_api.Data
{
    public class PolicyDbContext : DbContext
    {
        public PolicyDbContext(DbContextOptions<PolicyDbContext> option) : base(option)
        {
        }

        public DbSet<Policy> Policies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Policy>()
                .Property(p => p.PolicyNumber)
                .ValueGeneratedOnAdd();
        }

    }
}
