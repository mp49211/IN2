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
    public class TehnologijaProjektController : ControllerBase
    {
        private readonly In2Context _context;

        public TehnologijaProjektController(In2Context context)
        {
            _context = context;
        }

        // GET: api/TehnologijaProjekt
        [HttpGet]
        public IEnumerable<TehnologijaProjekt> GetTehnologijaProjekt()
        {
            return _context.TehnologijaProjekt.Include(a =>a.IdProjektaNavigation).Include(a=> a.IdTehnologijeNavigation);
        }

        // GET: api/TehnologijaProjekt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTehnologijaProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tehnologijaProjekt = await _context.TehnologijaProjekt.FindAsync(id);

            if (tehnologijaProjekt == null)
            {
                return NotFound();
            }

            return Ok(tehnologijaProjekt);
        }

        // PUT: api/TehnologijaProjekt/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTehnologijaProjekt([FromRoute] int id, [FromBody] TehnologijaProjekt tehnologijaProjekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tehnologijaProjekt.Id)
            {
                return BadRequest();
            }

            _context.Entry(tehnologijaProjekt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TehnologijaProjektExists(id))
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

        // POST: api/TehnologijaProjekt
        [HttpPost]
        public async Task<IActionResult> PostTehnologijaProjekt([FromBody] TehnologijaProjekt tehnologijaProjekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TehnologijaProjekt.Add(tehnologijaProjekt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTehnologijaProjekt", new { id = tehnologijaProjekt.Id }, tehnologijaProjekt);
        }

        // DELETE: api/TehnologijaProjekt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTehnologijaProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tehnologijaProjekt = await _context.TehnologijaProjekt.FindAsync(id);
            if (tehnologijaProjekt == null)
            {
                return NotFound();
            }

            _context.TehnologijaProjekt.Remove(tehnologijaProjekt);
            await _context.SaveChangesAsync();

            return Ok(tehnologijaProjekt);
        }

        private bool TehnologijaProjektExists(int id)
        {
            return _context.TehnologijaProjekt.Any(e => e.Id == id);
        }
    }
}