using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch ( ValidationException ex )
        {
            await HandelValidationException(context, ex);
        }
        catch ( Exception e )
        {
            await HandleException(context, e);
        }
    }

    private async Task HandleException(HttpContext context, Exception exception)
    {
        logger.LogError(exception, exception.Message);
        
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, exception.Message, exception.StackTrace)
            : new AppException(context.Response.StatusCode, exception.Message, null);

        // this is not API controller therefore will use Pascal Case by default
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        
        var json = JsonSerializer.Serialize(response, options);
        
        await context.Response.WriteAsync(json);
    }

    private static async Task HandelValidationException(HttpContext context, ValidationException ex)
    {
        var validationError = new Dictionary<string, string[]>();
        foreach ( var error in ex.Errors )
        {
            // if prop. already has errors, append another
            if ( validationError.TryGetValue(error.PropertyName, out var existingErrors) )
            {
                validationError[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
            }
            else
            {
                validationError[error.PropertyName] = [error.ErrorMessage];
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        ValidationProblemDetails validationProblemDetails = new(validationError)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more validation errors occurred."
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}