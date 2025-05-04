namespace Application.Profiles.DTOs;

// Details to be sent in Activity Attendees
public class UserProfile
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

}
