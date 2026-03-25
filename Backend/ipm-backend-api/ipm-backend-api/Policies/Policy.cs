using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ipm_backend_api.Policies
{
    [Table("Policy", Schema = "IPM")]
    public class Policy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Id")]
        public Guid Id { get; set; }

        [Required]
        [Column("PolicyNumber", TypeName = "VARCHAR(20)")]
        public string PolicyNumber { get; set; } = string.Empty;

        [Required]
        [Column("CustomerName", TypeName = "VARCHAR(100)")]
        public string CustomerName { get; set; } = string.Empty;

        [Column("PolicyType")]
        public PolicyType PolicyType { get; set; }

        [Column("SumInsured", TypeName = "DECIMAL(18,2)")]
        public decimal SumInsured { get; set; }

        [Column("StartDate")]
        public DateTimeOffset StartDate { get; set; }

        [Column("EndDate")]
        public DateTimeOffset EndDate { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; } = true;

        [Column("CreatedDate")]
        public DateTimeOffset CreatedDate { get; set; }
    }
}