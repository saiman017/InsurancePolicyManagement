using FluentValidation;

namespace ipm_backend_api.Policies.Dtos
{
    public class PolicyRequestDtoValidator : AbstractValidator<PolicyRequestDto>
    {
        public PolicyRequestDtoValidator()
        {
            RuleFor(x => x.CustomerName)
                .NotEmpty().WithMessage("Customer Name is required.")
                .MaximumLength(100).WithMessage("Customer Name cannot exceed 100 characters.");

            RuleFor(x => x.SumInsured)
                .GreaterThan(0).WithMessage("Sum Insured must be greater than zero.");

            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("Start Date is required.");

            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("End Date is required.")
                .GreaterThan(x => x.StartDate)
                .WithMessage("End Date must be greater than Start Date.");
        }
    }
}