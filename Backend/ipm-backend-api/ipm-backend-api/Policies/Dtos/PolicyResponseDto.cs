using System.Text.Json.Serialization;

namespace ipm_backend_api.Policies.Dtos
{
    public class PolicyResponseDto
    {
        public Guid Id { get; set; }

        public string PolicyNumber { get; set; }

        public string CustomerName { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PolicyType PolicyType { get; set; }

        public decimal SumInsured { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public bool IsActive { get; set; }

        public DateTimeOffset CreatedDate { get; set; }
    }
}