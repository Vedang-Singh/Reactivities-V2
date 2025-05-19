using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

// Options is passed from options.UseSqlite(...) in API/Program.cs
public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<UserFollowing> UserFollowings { get; set; }

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

        builder.Entity<UserFollowing>(x =>
        {
            x.HasKey(k => new { k.ObserverId, k.TargetId });

            x.HasOne(k => k.Observer)
                .WithMany(user => user.Followings)
                .HasForeignKey(k => k.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            x.HasOne(k => k.Target)
                .WithMany(user => user.Followers)
                .HasForeignKey(k => k.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        });


        // to get consisitant dates in UTC
        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach ( var entityType in builder.Model.GetEntityTypes() )
        {
            foreach ( var property in entityType.GetProperties() )
            {
                if ( property.ClrType == typeof(DateTime) )
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
