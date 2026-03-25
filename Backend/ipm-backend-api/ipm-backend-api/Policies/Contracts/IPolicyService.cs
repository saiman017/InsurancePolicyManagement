using ipm_backend_api.Policies.Dtos;
using ipm_backend_api.Response;

namespace ipm_backend_api.Policies.Contracts
{
    public interface IPolicyService
    {
        Task<APIResponse> AddPolicyAsync(PolicyRequestDto requestDto);

        Task<APIResponse> UpdatePolicyAsync(Guid id, PolicyRequestDto requestDto);

        Task<APIResponse> GetAllPolicyAsync();

        Task<APIResponse> GetPolicyByIdAsync(Guid id);

    }
}
