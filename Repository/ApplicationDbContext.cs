namespace Repository;

using Abstractions.Entity;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }
    
   public DbSet<Stop> Stops { get; set; }
   public DbSet<User> Users { get; set; }
}