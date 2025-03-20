namespace Domain;

public class Activity
{
    // string are better to work with than Guids cz can assign it to, say, "a"
    public string Id { get; set; } = Guid.NewGuid().ToString();
    // required removes Non-nullable warning
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }

    // location properties
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

}
