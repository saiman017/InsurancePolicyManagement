using ipm_backend_api.Policies.Dtos;

namespace ipm_backend_api.Policies
{
    public static class PolicyMapper
    {
        public static Policy ToPolicy(PolicyRequestDto requestDto)
        {
            return new Policy
            {
                CustomerName = requestDto.CustomerName,
                PolicyType = requestDto.PolicyType,
                SumInsured = requestDto.SumInsured,
                StartDate = requestDto.StartDate,
                EndDate = requestDto.EndDate,
                IsActive = requestDto.EndDate >= DateTimeOffset.UtcNow,
                CreatedDate = DateTimeOffset.UtcNow
            };
        }

        public static Policy ToUpdatePolicy(Policy policy, PolicyRequestDto requestDto)
        {
            policy.CustomerName = requestDto.CustomerName;
            policy.PolicyType = requestDto.PolicyType;
            policy.SumInsured = requestDto.SumInsured;
            policy.StartDate = requestDto.StartDate;
            policy.EndDate = requestDto.EndDate;
            policy.IsActive = requestDto.EndDate >= DateTimeOffset.UtcNow;

            return policy;
        }

        public static PolicyResponseDto ToPolicyResponse(Policy policy)
        {
            return new PolicyResponseDto
            {
                Id = policy.Id,
                PolicyNumber = policy.PolicyNumber,
                CustomerName = policy.CustomerName,
                PolicyType = policy.PolicyType,
                SumInsured = policy.SumInsured,
                StartDate = policy.StartDate,
                EndDate = policy.EndDate,
                IsActive = policy.IsActive,
                CreatedDate = policy.CreatedDate
            };
        }
    }
}