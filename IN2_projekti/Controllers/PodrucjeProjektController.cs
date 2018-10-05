using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IN2_projekti.Models;

namespace IN2_projekti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PodrucjeProjektController : ControllerBase
    {
        private readonly In2Context _context;

        public PodrucjeProjektController(In2Context context)
        {
            _context = context;
        }

        // GET: api/PodrucjeProjekt
        [HttpGet]
        public IEnumerable<PodrucjeProjekt> GetPodrucjeProjekt()
        {
            return _context.PodrucjeProjekt.Include(a => a.IdPodrucjaNavigation).Include(a => a.IdProjektaNavigation);
        }

        // GET: api/PodrucjeProjekt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPodrucjeProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var podrucjeProjekt = await _context.PodrucjeProjekt.FindAsync(id);

            if (podrucjeProjekt == null)
            {
                return NotFound();
            }

            return Ok(podrucjeProjekt);
        }

        // PUT: api/PodrucjeProjekt/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPodrucjeProjekt([FromRoute] int id, [FromBody] PodrucjeProjekt podrucjeProjekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != podrucjeProjekt.Id)
            {
                return BadRequest();
            }

            _context.Entry(podrucjeProjekt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PodrucjeProjektExists(id))
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

        // POST: api/PodrucjeProjekt
        [HttpPost]
        public async Task<IActionResult> PostPodrucjeProjekt([FromBody] PodrucjeProjekt podrucjeProjekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PodrucjeProjekt.Add(podrucjeProjekt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPodrucjeProjekt", new { id = podrucjeProjekt.Id }, podrucjeProjekt);
        }

        // DELETE: api/PodrucjeProjekt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePodrucjeProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var podrucjeProjekt = await _context.PodrucjeProjekt.FindAsync(id);
            if (podrucjeProjekt == null)
            {
                return NotFound();
            }

            _context.PodrucjeProjekt.Remove(podrucjeProjekt);
            await _context.SaveChangesAsync();

            return Ok(podrucjeProjekt);
        }

        private bool PodrucjeProjektExists(int id)
        {
            return _context.PodrucjeProjekt.Any(e => e.Id == id);
        }
    }
}