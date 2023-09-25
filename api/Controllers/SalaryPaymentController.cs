using api.Context;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalaryPaymentController : ControllerBase
    {
        private readonly AppDbContext context;
        public SalaryPaymentController(AppDbContext _context)
        {
            context = _context;
        }

        [HttpPost("savesalary")]
        public IActionResult SaveSalaryData([FromBody] List<SalaryPayment> salaryDataList)
        {
            foreach (var data in salaryDataList)
            {
                var entity = new SalaryPayment
                {
                    Salary = data.Salary,
                    Month = data.Month,
                    Year = data.Year,
                    EmpId= data.EmpId,
                };

                context.Salary.Add(entity);
            }

            context.SaveChanges();

            return Ok(new {Message= "Salary data saved successfully" });
        }
        
    }
}
