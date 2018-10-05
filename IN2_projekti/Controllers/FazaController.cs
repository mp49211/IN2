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
    public class FazaController : ControllerBase
    {
        private readonly In2Context _context;

        public FazaController(In2Context context)
        {
            _context = context;
        }

        // GET: api/Faza
        [HttpGet]
        public IEnumerable<FazaDTO> GetFaza()
        {
            return _context.Faza.Select(x => new FazaDTO() {
                IdFaze = x.IdFaze,
                Naziv = x.Naziv,
                Opis = x.Opis
            });
        }

        // GET: api/Faza/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFaza([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var faza = await _context.Faza.FindAsync(id);

            if (faza == null)
            {
                return NotFound();
            }

            return Ok(faza);
        }

        // PUT: api/Faza/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaza([FromRoute] int id, [FromBody] Faza faza)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != faza.IdFaze)
            {
                return BadRequest();
            }

            _context.Entry(faza).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FazaExists(id))
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

        // POST: api/Faza
        [HttpPost]
        public async Task<IActionResult> PostFaza([FromBody] Faza faza)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Faza.Add(faza);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFaza", new { id = faza.IdFaze }, faza);
        }

        // DELETE: api/Faza/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaza([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var faza = await _context.Faza.FindAsync(id);
            if (faza == null)
            {
                return NotFound();
            }

            _context.Faza.Remove(faza);
            await _context.SaveChangesAsync();

            return Ok(faza);
        }

        private bool FazaExists(int id)
        {
            return _context.Faza.Any(e => e.IdFaze == id);
        }
    }
}