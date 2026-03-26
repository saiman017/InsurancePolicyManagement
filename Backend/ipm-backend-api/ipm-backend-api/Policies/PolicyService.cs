using ipm_backend_api.Data.Contracts;
using ipm_backend_api.Policies.Contracts;
using ipm_backend_api.Policies.Dtos;
using ipm_backend_api.Response;

namespace ipm_backend_api.Policies
{
    public class PolicyService : IPolicyService
    {
        private readonly IUnitOfWork _db;

        public PolicyService(IUnitOfWork db)
        {
            _db = db;
        }

        public async Task<APIResponse> AddPolicyAsync(PolicyRequestDto requestDto)
        {
            var validationResult = requestDto.Validate();
            if (!validationResult.IsValid)
                return ResponseHandler.GetValidationErrorResponse(validationResult);

            var policy = PolicyMapper.ToPolicy(requestDto);

            await _db.Policies.AddAsync(policy);

            string result = await _db.SaveAsync();

            policy = await _db.Policies.GetByIdAsync(policy.Id);

            return ResponseHandler.GetSuccessResponse(PolicyMapper.ToPolicyResponse(policy),result);
        }

        public async Task<APIResponse> GetAllPolicyAsync()
        {
            var policies = await _db.Policies.GetAllAsync();

            var responseList = policies.Select(p => PolicyMapper.ToPolicyResponse(p)).ToList();

            return ResponseHandler.GetSuccessResponse(responseList);
        }

        public async Task<APIResponse> GetPolicyByIdAsync(Guid id)
        {
            var policy = await _db.Policies.GetByIdAsync(id);

            if (policy == null)
                throw new KeyNotFoundException("Policy not found");

            return ResponseHandler.GetSuccessResponse(PolicyMapper.ToPolicyResponse(policy));
        }

        public async Task<APIResponse> UpdatePolicyAsync(Guid id, PolicyRequestDto requestDto)
        {
            var existingPolicy = await _db.Policies.GetByIdAsync(id);

            if (existingPolicy == null)
                throw new KeyNotFoundException($"Policy with Id {id} does not exists");

            var validationResult = requestDto.Validate();
            if (!validationResult.IsValid)
                return ResponseHandler.GetValidationErrorResponse(validationResult);

            PolicyMapper.ToUpdatePolicy(existingPolicy, requestDto);

            await _db.Policies.UpdateAsync(existingPolicy);
            string result = await _db.SaveAsync();

            return ResponseHandler.GetSuccessResponse(PolicyMapper.ToPolicyResponse(existingPolicy), result);
        }

        public async Task<APIResponse> GetPolicySummaryAsync()
        {
            var policies = await _db.Policies.GetAllAsync();

            var summary = new PolicySummaryDto
            {
                TotalPolicies = policies.Count,
                MotorCount = policies.Count(p => p.PolicyType == PolicyType.Motor),
                PropertyCount = policies.Count(p => p.PolicyType == PolicyType.Property),
                TravelCount = policies.Count(p => p.PolicyType == PolicyType.Travel),
                TotalSumInsured = policies.Sum(p => p.SumInsured),
                HighValuePolicies = policies.Count(p => p.SumInsured > 20000000)
            };

            return ResponseHandler.GetSuccessResponse(summary);
        }

        public async Task<APIResponse> GetPolicyCountByTypeAsync()
        {
            var policies = await _db.Policies.GetAllAsync();

            var countByType = policies
                .GroupBy(p => p.PolicyType)
                .Select(g => new PolicyCountByTypeDto
                {
                    Type = g.Key.ToString(),
                    Count = g.Count()
                })
                .OrderBy(x => x.Type)
                .ToList();

            return ResponseHandler.GetSuccessResponse(countByType);
        }

        public async Task<APIResponse> GetSumInsuredByTypeAsync()
        {
            var policies = await _db.Policies.GetAllAsync();

            var sumInsuredByType = policies
                .GroupBy(p => p.PolicyType)
                .Select(g => new SumInsuredByTypeDto
                {
                    Type = g.Key.ToString(),
                    TotalSumInsured = g.Sum(p => p.SumInsured)
                })
                .OrderBy(x => x.Type)
                .ToList();

            return ResponseHandler.GetSuccessResponse(sumInsuredByType);
        }
    }
}