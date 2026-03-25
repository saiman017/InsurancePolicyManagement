using System.Net;
using FluentValidation.Results;


namespace ipm_backend_api.Response
{
    public  static class ResponseHandler
    {
        public static APIResponse GetSuccessResponse(dynamic data, string message)
        {
            return new APIResponse(true, HttpStatusCode.OK, data, message);
        }

        public static APIResponse GetSuccessResponse(dynamic data)
        {
            return new APIResponse(true, HttpStatusCode.OK, data, Message.OK);
        }

        public static APIResponse GetValidationErrorResponse(ValidationResult? validationResult)
        {
            IDictionary<string, string> errors = new Dictionary<string, string>();

            foreach (var error in validationResult.Errors)
            {
                errors[error.PropertyName] = error.ErrorMessage;
            }

            return new APIResponse(false, HttpStatusCode.BadRequest, errors, Message.ERROR);
        }

        public static APIResponse GetBadRequestResponse(string message)
        {
            return new APIResponse(false, HttpStatusCode.BadRequest, message, Message.ERROR);
        }

        public static APIResponse GetNotFoundResponse(string message)
        {
            return new APIResponse(false, HttpStatusCode.NotFound, message, Message.ERROR);
        }
    }
}
