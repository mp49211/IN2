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
    public class OsobaController : ControllerBase
    {
        private readonly In2Context _context;

        public OsobaController(In2Context context)
        {
            _context = context;
        }

        // GET: api/Osoba
        [HttpGet]
        public IEnumerable<OsobaDTO> GetOsoba()
        {
            
            return _context.Osoba.Select(x => new OsobaDTO() {
                IdOsobe = x.IdOsobe,
                ImePrezime = x.Ime + " " + x.Prezime,
                Ime = x.Ime,
                Prezime = x.Prezime,
                Oib = x.Oib,
                DatumRodenja = x.DatumRodenja,
                DatumOdlaska = x.DatumOdlaska,
                DatumZaposlenja = x.DatumZaposlenja,
                Email = x.Email,
                Telefon = x.Telefon
            });
        }

        // GET: api/Osoba/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOsoba([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            var osoba = await _context.Osoba.FindAsync(id);

            OsobaDTO osobaDTO = new OsobaDTO()
            {
                IdOsobe = id,
                Ime = osoba.Ime,
                Prezime = osoba.Prezime,
                DatumOdlaska = osoba.DatumOdlaska,
                DatumZaposlenja = osoba.DatumZaposlenja,
                DatumRodenja = osoba.DatumRodenja,
                Email = osoba.Email,
                ImePrezime = osoba.Ime + " " + osoba.Prezime,
                Oib = osoba.Oib,
                Telefon = osoba.Telefon
            };

            if (osobaDTO == null)
            {
                return NotFound();
            }

            return Ok(osobaDTO);
        }

        // PUT: api/Osoba/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOsoba([FromRoute] int id, [FromBody] OsobaDTO osobaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != osobaDTO.IdOsobe)
            {
                return BadRequest();
            }

            Osoba osoba = _context.Osoba.FirstOrDefault(x => x.IdOsobe == id);
            osoba.Ime = osobaDTO.Ime;
            osoba.Prezime = osobaDTO.Prezime;
            osoba.Oib = osobaDTO.Oib;
            osoba.Telefon = osobaDTO.Telefon;
            osoba.DatumOdlaska = osobaDTO.DatumOdlaska;
            osoba.DatumRodenja = osobaDTO.DatumRodenja;
            osoba.DatumZaposlenja = osobaDTO.DatumZaposlenja;
            osoba.Email = osobaDTO.Email;

            _context.Entry(osoba).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OsobaExists(id))
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

        // POST: api/Osoba
        [HttpPost]
        public async Task<IActionResult> PostOsoba([FromBody] OsobaDTO osobaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Osoba osoba = new Osoba()
            {
                Ime = osobaDTO.Ime,
                Prezime = osobaDTO.Prezime,
                Oib = osobaDTO.Oib,
                DatumOdlaska = osobaDTO.DatumOdlaska,
                DatumRodenja = osobaDTO.DatumRodenja,
                DatumZaposlenja = osobaDTO.DatumZaposlenja,
                Telefon = osobaDTO.Telefon,
                Email = osobaDTO.Email,
                IdOsobe = osobaDTO.IdOsobe
            };

            _context.Osoba.Add(osoba);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOsoba", new { id = osoba.IdOsobe }, osoba);
        }

        // DELETE: api/Osoba/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOsoba([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var osoba = await _context.Osoba.FindAsync(id);
            if (osoba == null)
            {
                return NotFound();
            }

            _context.Osoba.Remove(osoba);
            await _context.SaveChangesAsync();

            return Ok(osoba);
        }

        private bool OsobaExists(int id)
        {
            return _context.Osoba.Any(e => e.IdOsobe == id);
        }
    }
}