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
    public class PoslovnoPodrucjeController : ControllerBase
    {
        private readonly In2Context _context;

        public PoslovnoPodrucjeController(In2Context context)
        {
            _context = context;
        }

        // GET: api/PoslovnoPodrucje
        [HttpGet]
        public IEnumerable<PodrucjeDTO> GetPoslovnoPodrucje()
        {
            return _context.PoslovnoPodrucje.Select(x => new PodrucjeDTO() {
                IdPodrucja = x.IdPodrucja,
                Naziv = x.Naziv,
                Opis = x.Opis
                
            });
        }

        // GET: api/PoslovnoPodrucje/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPoslovnoPodrucje([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var poslovnoPodrucje = await _context.PoslovnoPodrucje.FindAsync(id);

            if (poslovnoPodrucje == null)
            {
                return NotFound();
            }

            return Ok(poslovnoPodrucje);
        }

        // PUT: api/PoslovnoPodrucje/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPoslovnoPodrucje([FromRoute] int id, [FromBody] PoslovnoPodrucje poslovnoPodrucje)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != poslovnoPodrucje.IdPodrucja)
            {
                return BadRequest();
            }

            _context.Entry(poslovnoPodrucje).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PoslovnoPodrucjeExists(id))
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

        // POST: api/PoslovnoPodrucje
        [HttpPost]
        public async Task<IActionResult> PostPoslovnoPodrucje([FromBody] PoslovnoPodrucje poslovnoPodrucje)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PoslovnoPodrucje.Add(poslovnoPodrucje);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPoslovnoPodrucje", new { id = poslovnoPodrucje.IdPodrucja }, poslovnoPodrucje);
        }

        // DELETE: api/PoslovnoPodrucje/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoslovnoPodrucje([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var poslovnoPodrucje = await _context.PoslovnoPodrucje.FindAsync(id);
            if (poslovnoPodrucje == null)
            {
                return NotFound();
            }

            _context.PoslovnoPodrucje.Remove(poslovnoPodrucje);
            await _context.SaveChangesAsync();

            return Ok(poslovnoPodrucje);
        }

        private bool PoslovnoPodrucjeExists(int id)
        {
            return _context.PoslovnoPodrucje.Any(e => e.IdPodrucja == id);
        }
    }
}