using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerManagement.Data;
using CustomerManagement.Models;
using System.Threading.Tasks;

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext _context;

        public CustomerController(CustomerDbContext context)
        {
            _context = context;
        }

        // CREATE
        [HttpPost]
        public async Task<ActionResult<CustomerProfile>> CreateCustomer(CustomerProfile customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CustomerProfiles.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        // READ (Get All)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerProfile>>> GetCustomers()
        {
            return await _context.CustomerProfiles.ToListAsync();
        }

        // READ (Get by ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerProfile>> GetCustomer(int id)
        {
            var customer = await _context.CustomerProfiles.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, CustomerProfile customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.CustomerProfiles.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.CustomerProfiles.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.CustomerProfiles.Any(e => e.Id == id);
        }
    }
}