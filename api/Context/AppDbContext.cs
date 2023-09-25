using api.Helpers;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace api.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<SalaryPayment> Salary { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("employee");
            modelBuilder.Entity<SalaryPayment>().ToTable("salary");

            modelBuilder.Entity<Employee>().HasData(
           new Employee
           {
               Id = 1,
               FullName = "Administrator",
               Email = "admin@gmail.com",
               Salary = 0,
               JoinDate = "",
               PhoneNumber = "",
               Address = "",
               Password = PasswordHash.HashPassword("admin123"),
               Role = "Admin",
               IsActive = true
           }
       );
        }
    }
}
