using FluentValidation.Results;

namespace ipm_backend_api.Policies.Dtos
{
    public class PolicyRequestDto
    {
        public PolicyRequestDtoValidator _validator = new PolicyRequestDtoValidator();

        public string CustomerName { get; set; }

        public PolicyType PolicyType { get; set; }

        public decimal SumInsured { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public ValidationResult Validate()
        {
            return _validator.Validate(this);
        }
    }
}