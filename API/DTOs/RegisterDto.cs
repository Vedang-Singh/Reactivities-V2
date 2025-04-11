using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string DisplayName { get; set; } = "";

    [Required, EmailAddress]
    public string Email { get; set; } = ""; // Username is also Email

    // Validation here is already enforced by Identity
    public string Password { get; set; } = "";
}
