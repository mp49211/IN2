using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IN2_projekti.Models;
using IN2_projekti.DTO;

namespace IN2_projekti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UlogaController : ControllerBase
    {
        private readonly In2Context _context;

        public UlogaController(In2Context context)
        {
            _context = context;
        }

        // GET: api/Uloga
        [HttpGet]
        public IEnumerable<UlogaDTO> GetUloga()
        {
            return _context.Uloga.Select(x => new UlogaDTO()
            {
                IdUloge = x.IdUloge,
                Naziv = x.Naziv,
                Opis = x.Opis
            });
        }

        // GET: api/Uloga/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUloga([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var uloga = await _context.Uloga.FindAsync(id);

            if (uloga == null)
            {
                return NotFound();
            }

            return Ok(uloga);
        }

        // PUT: api/Uloga/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUloga([FromRoute] int id, [FromBody] Uloga uloga)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != uloga.IdUloge)
            {
                return BadRequest();
            }

            _context.Entry(uloga).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UlogaExists(id))
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

        // POST: api/Uloga
        [HttpPost]
        public async Task<IActionResult> PostUloga([FromBody] Uloga uloga)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Uloga.Add(uloga);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUloga", new { id = uloga.IdUloge }, uloga);
        }

        // DELETE: api/Uloga/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUloga([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var uloga = await _context.Uloga.FindAsync(id);
            if (uloga == null)
            {
                return NotFound();
            }

            _context.Uloga.Remove(uloga);
            await _context.SaveChangesAsync();

            return Ok(uloga);
        }

        private bool UlogaExists(int id)
        {
            return _context.Uloga.Any(e => e.IdUloge == id);
        }
    }
}