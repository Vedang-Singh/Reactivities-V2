using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

// Options is passed from options.UseSqlite(...) in API/Program.cs
public class AppDbContext(DbContextOptions options): DbContext(options)
{
    public required DbSet<Activity> Activities { get; set; }
}
