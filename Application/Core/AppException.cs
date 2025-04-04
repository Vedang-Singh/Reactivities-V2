namespace Application.Core;

public class AppException(int statusCode, string message, string? details)
{
    public int StatusCode { get; } = statusCode;
    public string Message { get; } = message;
    public string? Details { get; } = details;
}