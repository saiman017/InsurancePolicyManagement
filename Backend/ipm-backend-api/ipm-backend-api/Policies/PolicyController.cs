using ipm_backend_api.Policies.Contracts;
using ipm_backend_api.Policies.Dtos;
using ipm_backend_api.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ipm_backend_api.Policies
{
    [Route("api/policy")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyService _policyService;

        public PolicyController(IPolicyService policyService)
        {
            _policyService = policyService;
        }

        [HttpPost]
        public async Task<APIResponse> AddPolicyAsync(PolicyRequestDto requestDto)
        {
            var apiResponse = await _policyService.AddPolicyAsync(requestDto);

            return apiResponse;
        }


        [HttpGet]
        public async Task<APIResponse> GetAllPolicyAsync()
        {
            var apiResponse = await _policyService.GetAllPolicyAsync();

            return apiResponse;

        }

        [HttpGet("{id}")]
        public async Task<APIResponse> GetPolicyByIdAsync(Guid id)
        {
            var apiResponse = await _policyService.GetPolicyByIdAsync(id);

            return apiResponse;
        }

        [HttpPut("{id}")]
        public async Task<APIResponse> UpdateClaimAsync(Guid id, PolicyRequestDto requestDto)
        {
            var apiResponse = await _policyService.UpdatePolicyAsync(id, requestDto);

            return apiResponse;
        }
    }
}
