using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public decimal? Salary { get; set; }
        public string? JoinDate { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public bool? IsActive { get; set; }
        [JsonIgnore]
        public virtual ICollection<SalaryPayment>? SalaryPayments { get; set; }
    }
}
