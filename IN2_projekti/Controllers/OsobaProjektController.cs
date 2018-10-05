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
    public class OsobaProjektController : ControllerBase
    {
        private readonly In2Context _context;

        public OsobaProjektController(In2Context context)
        {
            _context = context;
        }

        // GET: api/OsobaProjekt
        [HttpGet]
        public IEnumerable<OsobaProjekt> GetOsobaProjekt()
        {
            return _context.OsobaProjekt/*.Include(a => a.IdUlogeNavigation).Include(a => a.IdProjektaNavigation).Include(a => a.IdOsobeNavigation)*/;
        }

        // GET: api/OsobaProjekt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOsobaProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var osobaProjekt = await _context.OsobaProjekt.FindAsync(id);

            if (osobaProjekt == null)
            {
                return NotFound();
            }

            return Ok(osobaProjekt);
        }

        // PUT: api/OsobaProjekt/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOsobaProjekt([FromRoute] int id, [FromBody] OsobaProjekt osobaProjekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != osobaProjekt.Id)
            {
                return BadRequest();
            }

            _context.Entry(osobaProjekt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OsobaProjektExists(id))
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

        // POST: api/OsobaProjekt
        [HttpPost]
        public async Task<IActionResult> PostOsobaProjekt([FromBody] OsobaProjekt osobaProjekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.OsobaProjekt.Add(osobaProjekt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOsobaProjekt", new { id = osobaProjekt.Id }, osobaProjekt);
        }

        // DELETE: api/OsobaProjekt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOsobaProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var osobaProjekt = await _context.OsobaProjekt.FindAsync(id);
            if (osobaProjekt == null)
            {
                return NotFound();
            }

            _context.OsobaProjekt.Remove(osobaProjekt);
            await _context.SaveChangesAsync();

            return Ok(osobaProjekt);
        }

        private bool OsobaProjektExists(int id)
        {
            return _context.OsobaProjekt.Any(e => e.Id == id);
        }
    }
}