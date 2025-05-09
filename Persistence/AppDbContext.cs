using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

// Options is passed from options.UseSqlite(...) in API/Program.cs
public class AppDbContext(DbContextOptions options): IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Primary Key
        builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.ActivityId, aa.UserId }));


        // Many-to-Many Relationship
        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.User)
            .WithMany(aa => aa.Activities)
            .HasForeignKey(aa => aa.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(aa => aa.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
    }
}
