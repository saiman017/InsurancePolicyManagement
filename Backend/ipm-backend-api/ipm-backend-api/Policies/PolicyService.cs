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

            policy = await _db.Policies.AddAsync(policy);

            string result = await _db.SaveAsync();

            return ResponseHandler.GetSuccessResponse(policy,result);
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

            PolicyMapper.ToUpdatePolicy(existingPolicy, requestDto);

            await _db.Policies.UpdateAsync(existingPolicy);
            string result = await _db.SaveAsync();

            return ResponseHandler.GetSuccessResponse(PolicyMapper.ToPolicyResponse(existingPolicy), result);
        }
    }
}