namespace ipm_backend_api.Policies.Dtos
{
    public class PolicySummaryDto
    {
        public int TotalPolicies { get; set; }
        public int MotorCount { get; set; }
        public int PropertyCount { get; set; }
        public int TravelCount { get; set; }
        public decimal TotalSumInsured { get; set; }
        public int HighValuePolicies { get; set; }
    }
}
