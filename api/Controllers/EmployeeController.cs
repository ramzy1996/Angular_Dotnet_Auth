using api.Context;
using api.Helpers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext context;
        public EmployeeController(AppDbContext _context)
        {
            context = _context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Employee emp)
        {
            if (emp == null)
            {
                return BadRequest();
            }
            // Validate email and password
            var employee = await context.Employees.FirstOrDefaultAsync(e => e.Email == emp.Email);
            var checkEmp = await context.Employees.FirstOrDefaultAsync(e => e.Email == emp.Email && e.IsActive == false);

            if (employee == null)
            {
                return NotFound(new { Message = "User not found" });
            }
            //check employe blocked or unblocked            
            if (checkEmp != null)
            {
                return BadRequest(new { Message = "User blocked" });
            }
            // verify password
            if (!PasswordHash.VerifyPassword(emp.Password, employee.Password))
            {
                return BadRequest(new { Message = "Password is incorrect" });
            }
            employee.Token = CreateJwt(employee);
            // Return a success response.
            return Ok(new { Message = "Login success", Token = employee.Token });
        }

        [HttpPost("addemployee")]
        [Authorize]
        public async Task<IActionResult> Register([FromBody] Employee emp)
        {
            if (emp == null)
            {
                return BadRequest();
            }
            var employee = await context.Employees.FirstOrDefaultAsync(e => e.Email == emp.Email);
            if (employee != null)
            {
                return BadRequest(new { Message = "The employee already exists." });
            }
            // Generate a temporary password for the employee.
            var tempPass = GeneratePassword();
            emp.Password = PasswordHash.HashPassword(tempPass);
            emp.Role = "Employee";
            emp.PhoneNumber = "";
            emp.Address = "";
            emp.Token = "";
            emp.IsActive = true;

            // Create the new user.
            await context.Employees.AddAsync(emp);
            await context.SaveChangesAsync();

            // Return a success response.
            return Ok(new { Message = "The employee has been created.", Email = emp.Email, Password = tempPass });
        }

        [HttpGet("getEmployee")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeList()
        {
            if (context.Employees == null)
            {
                return NotFound();
            }
            return await context.Employees.ToListAsync();
        }
        [HttpPut("activate/{id}")]
        [Authorize]
        public async Task<IActionResult> Activate(int id, [FromBody] bool isActive)
        {
            var emp = await context.Employees.FindAsync(id);

            if (emp == null)
            {
                return NotFound();
            }

            emp.IsActive = isActive;
            context.Entry(emp).Property(x => x.IsActive).IsModified = true;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //get employee details by id
        [HttpGet("getemployee/{id}")]
        [Authorize()]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (context.Employees == null)
            {
                return NotFound();
            }
            var emp = await context.Employees
                .Include(e => e.SalaryPayments)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (emp == null)
            {
                return NotFound();
            }

            return emp;
        }

        public static string GeneratePassword()
        {
            var randomNumberGenerator = new RNGCryptoServiceProvider();
            var byteArray = new byte[8];
            randomNumberGenerator.GetBytes(byteArray);
            var password = Convert.ToBase64String(byteArray);
            return password;
        }
        private bool EmployeeModelExists(int id)
        {
            return (context.Employees?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private string CreateJwt(Employee emp)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("asp.netcoreseretkey");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, emp.Role),
                new Claim(ClaimTypes.Name,$"{emp.FullName}"),
                new Claim("id",$"{emp.Id}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddHours(5),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
