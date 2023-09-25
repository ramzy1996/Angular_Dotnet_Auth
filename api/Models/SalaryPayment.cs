
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class SalaryPayment
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Employee")]
        public int EmpId { get; set; }
        public string Month { get; set; }
        public int Year { get; set; }
        public decimal Salary { get; set; }
        [JsonIgnore]
        public virtual Employee? Employee { get; set; }
    }
}
