using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

// Options is passed from options.UseSqlite(...) in API/Program.cs
public class AppDbContext(DbContextOptions options): IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
}
