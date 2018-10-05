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
    public class TehnoloskiStackController : ControllerBase
    {
        private readonly In2Context _context;

        public TehnoloskiStackController(In2Context context)
        {
            _context = context;
        }

        // GET: api/TehnoloskiStack
        [HttpGet]
        public IEnumerable<StackDTO> GetTehnoloskiStack()
        {
            return _context.TehnoloskiStack.Select(x => new StackDTO() {
                IdStacka = x.IdStacka,
                Naziv = x.Naziv,
                Opis = x.Opis
            });
        }

        // GET: api/TehnoloskiStack/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTehnoloskiStack([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tehnoloskiStack = await _context.TehnoloskiStack.FindAsync(id);

            if (tehnoloskiStack == null)
            {
                return NotFound();
            }

            return Ok(tehnoloskiStack);
        }

        // PUT: api/TehnoloskiStack/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTehnoloskiStack([FromRoute] int id, [FromBody] TehnoloskiStack tehnoloskiStack)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tehnoloskiStack.IdStacka)
            {
                return BadRequest();
            }

            _context.Entry(tehnoloskiStack).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TehnoloskiStackExists(id))
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

        // POST: api/TehnoloskiStack
        [HttpPost]
        public async Task<IActionResult> PostTehnoloskiStack([FromBody] TehnoloskiStack tehnoloskiStack)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TehnoloskiStack.Add(tehnoloskiStack);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTehnoloskiStack", new { id = tehnoloskiStack.IdStacka }, tehnoloskiStack);
        }

        // DELETE: api/TehnoloskiStack/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTehnoloskiStack([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tehnoloskiStack = await _context.TehnoloskiStack.FindAsync(id);
            if (tehnoloskiStack == null)
            {
                return NotFound();
            }

            _context.TehnoloskiStack.Remove(tehnoloskiStack);
            await _context.SaveChangesAsync();

            return Ok(tehnoloskiStack);
        }

        private bool TehnoloskiStackExists(int id)
        {
            return _context.TehnoloskiStack.Any(e => e.IdStacka == id);
        }
    }
}