using System.Text.Json.Serialization;

namespace Domain;
public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    // Navigation Properties
    // Creating this nav prop. will also define Cascade delete
    // meaning if the user is deleted, all their photos will be deleted
    public required string UserId { get; set; }

    [JsonIgnore] // To avoid circular reference in JsonSerialization
    public User User { get; set; } = null!;
}
