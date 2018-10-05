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
    public class DokumentController : ControllerBase
    {
        private readonly In2Context _context;

        public DokumentController(In2Context context)
        {
            _context = context;
        }

        // GET: api/Dokument
        [HttpGet]
        public IEnumerable<DokumentDTO> GetDokument()
        {
            return _context.Dokument.Select(x => new DokumentDTO()
            {
                IdDokumenta = x.IdDokumenta,
                Naziv = x.Naziv,
                Opis = x.Opis,
                Poveznica = x.Poveznica,
                ByteArray = x.ByteArray
            });
        }

        // GET: api/Dokument/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDokument([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dokument = await _context.Dokument.FindAsync(id);

            if (dokument == null)
            {
                return NotFound();
            }

            return Ok(dokument);
        }

        // PUT: api/Dokument/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDokument([FromRoute] int id, [FromBody] Dokument dokument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dokument.IdDokumenta)
            {
                return BadRequest();
            }

            _context.Entry(dokument).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DokumentExists(id))
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

        // POST: api/Dokument
        [HttpPost]
        public async Task<IActionResult> PostDokument([FromBody] DokumentDTO dokumentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Dokument dokument = new Dokument()
            {
                IdDokumenta = dokumentDTO.IdDokumenta,
                Naziv = dokumentDTO.Naziv,
                Opis = dokumentDTO.Opis,
                ByteArray = dokumentDTO.ByteArray,
                Poveznica = dokumentDTO.Poveznica

            };

            DokumentProjekt dp = new DokumentProjekt()
            {
                IdDokumenta = dokument.IdDokumenta,
                IdProjekta = dokumentDTO.IdProjekta,
                IdDokumentaNavigation = dokument,
                IdProjektaNavigation = _context.Projekt.FirstOrDefault(x => x.IdProjekta == dokumentDTO.IdProjekta)

            };

            _context.Dokument.Add(dokument);
            _context.DokumentProjekt.Add(dp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDokument", new { id = dokument.IdDokumenta }, dokument);
        }

        // DELETE: api/Dokument/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDokument([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dokument = await _context.Dokument.FindAsync(id);
            if (dokument == null)
            {
                return NotFound();
            }

            _context.Dokument.Remove(dokument);
            await _context.SaveChangesAsync();

            return Ok(dokument);
        }

        private bool DokumentExists(int id)
        {
            return _context.Dokument.Any(e => e.IdDokumenta == id);
        }
    }
}