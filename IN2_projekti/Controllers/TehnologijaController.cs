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
    public class TehnologijaController : ControllerBase
    {
        private readonly In2Context _context;

        public TehnologijaController(In2Context context)
        {
            _context = context;
        }

        // GET: api/Tehnologija
        [HttpGet]
        public IEnumerable<TehnologijaDTO> GetTehnologija()
        {
            return _context.Tehnologija.Select(x => new TehnologijaDTO() {
                IdTehnologije = x.IdTehnologije,
                Naziv = x.Naziv,
                Opis = x.Opis
            });
        }

        // GET: api/Tehnologija/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTehnologija([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tehnologija = await _context.Tehnologija.FindAsync(id);
            TehnologijaDTO tehDTO = new TehnologijaDTO()
            {
                IdTehnologije = id,
                Naziv = tehnologija.Naziv,
                Opis = tehnologija.Opis
            };

            if (tehDTO == null)
            {
                return NotFound();
            }

            return Ok(tehDTO);
        }

        // PUT: api/Tehnologija/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTehnologija([FromRoute] int id, [FromBody] Tehnologija tehnologijaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tehnologijaDTO.IdTehnologije)
            {
                return BadRequest();
            }

            Tehnologija tehnologija = _context.Tehnologija.FirstOrDefault(x => x.IdTehnologije == id);
            tehnologija.Naziv = tehnologijaDTO.Naziv;
            tehnologija.Opis = tehnologijaDTO.Opis;

            _context.Entry(tehnologija).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TehnologijaExists(id))
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

        // POST: api/Tehnologija
        [HttpPost]
        public async Task<IActionResult> PostTehnologija([FromBody] TehnologijaDTO tehnologijaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Tehnologija tehnologija = new Tehnologija()
            {
                Naziv = tehnologijaDTO.Naziv,
                IdTehnologije = tehnologijaDTO.IdTehnologije,
                Opis = tehnologijaDTO.Opis
            };

            _context.Tehnologija.Add(tehnologija);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTehnologija", new { id = tehnologija.IdTehnologije }, tehnologija);
        }

        // DELETE: api/Tehnologija/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTehnologija([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tehnologija = await _context.Tehnologija.FindAsync(id);
            if (tehnologija == null)
            {
                return NotFound();
            }

            _context.Tehnologija.Remove(tehnologija);
            await _context.SaveChangesAsync();

            return Ok(tehnologija);
        }

        private bool TehnologijaExists(int id)
        {
            return _context.Tehnologija.Any(e => e.IdTehnologije == id);
        }
    }
}