using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IN2_projekti.Models;
using Newtonsoft.Json;

namespace IN2_projekti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjektController : ControllerBase
    {
        private readonly In2Context _context;
        //private ProjektMapper mapper;

        public ProjektController(In2Context context/*, ProjektMapper m*/)
        {
            _context = context;
            //mapper = m;

            
        }

        // GET: api/Projekt
        [HttpGet]
        public IEnumerable<ProjektDTO> GetProjekt()
        {

            IEnumerable<Projekt> projekti = _context.Projekt.Include(x => x.IdStackaNavigation).Include(x => x.IdFazeNavigation);

            List<ProjektDTO> books = projekti.Select(x => new ProjektDTO()
            {
                IdProjekta = x.IdProjekta,
                Naziv = x.Naziv,
                Opis = x.Opis,
                KljucneRijeci = x.KljucneRijeci,
                DatumPocetka = x.DatumPocetka,
                DatumZavrsetka = x.DatumZavrsetka,
                IdFaze = x.IdFaze,
                IdStacka = x.IdStacka
                
            }).ToList();

            foreach(var projekt in books)
            {
                if(projekt.IdFaze != null)
                {
                    projekt.Faza = _context.Faza.Where(s => s.IdFaze == projekt.IdFaze).Select(s => new FazaDTO()
                    {
                        IdFaze = s.IdFaze,
                        Naziv = s.Naziv,
                        Opis = s.Opis
                    }).First();
                }

                if(projekt.IdStacka != null)
                {
                    projekt.Stack = _context.TehnoloskiStack.Where(s => s.IdStacka == projekt.IdStacka).Select(s => new StackDTO()
                    {
                        IdStacka = s.IdStacka,
                        Naziv = s.Naziv,
                        Opis = s.Opis
                    }).SingleOrDefault();
                }
               
                foreach (var t in _context.TehnologijaProjekt)
                {
                    if (t.IdProjekta == projekt.IdProjekta)
                    {
                        projekt.Tehnologije.Add(_context.Tehnologija.Where(x => x.IdTehnologije == t.IdTehnologije).Select(x => new TehnologijaDTO()
                        {
                            IdTehnologije = x.IdTehnologije,
                            Naziv = x.Naziv,
                            Opis = x.Opis
                        }).SingleOrDefault(s => s.IdTehnologije == t.IdTehnologije));
                    }
                }

                foreach (var t in _context.PodrucjeProjekt)
                {
                    if (t.IdProjekta == projekt.IdProjekta)
                    {
                        projekt.Podrucja.Add(_context.PoslovnoPodrucje.Where(x => x.IdPodrucja == t.IdPodrucja).Select(x => new PodrucjeDTO()
                        {
                            IdPodrucja = x.IdPodrucja,
                            Naziv = x.Naziv,
                            Opis = x.Opis
                        }).FirstOrDefault());
                    }
                }

                foreach (var t in _context.OsobaProjekt)
                {
                    if (t.IdProjekta == projekt.IdProjekta)
                    {
                        projekt.Sudionici.Add(_context.OsobaProjekt.Include(h => h.IdOsobeNavigation).Include(o => o.IdUlogeNavigation).Where(x => x.IdOsobe == t.IdOsobe).Where(x => x.IdProjekta == projekt.IdProjekta).Select(x => new SudionikDTO()
                        {
                            IdOsobe = x.IdOsobe,
                            ImePrezime = x.IdOsobeNavigation.Ime + " " + x.IdOsobeNavigation.Prezime,
                            Oib = x.IdOsobeNavigation.Oib,
                            DatumRodenja = x.IdOsobeNavigation.DatumRodenja,
                            DatumOdlaska = x.IdOsobeNavigation.DatumOdlaska,
                            DatumZaposlenja = x.IdOsobeNavigation.DatumZaposlenja,
                            Email = x.IdOsobeNavigation.Email,
                            Telefon = x.IdOsobeNavigation.Telefon,
                            IdUloge = x.IdUloge,
                            NazivUloge = x.IdUlogeNavigation.Naziv,
                            OpisUloge = x.IdUlogeNavigation.Opis
                        }).FirstOrDefault());
                    }
                }


            }
            
            
            return books;

            // return mapper.MapProjekti(_context);
        }

        // GET: api/Projekt/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projekt = await _context.Projekt.Include(x => x.IdStackaNavigation).Include(x => x.IdFazeNavigation).Where(d => d.IdProjekta == id).Select(x => new ProjektDTO()
            {
                IdProjekta = x.IdProjekta,
                Naziv = x.Naziv,
                Opis = x.Opis,
                KljucneRijeci = x.KljucneRijeci,
                DatumPocetka = x.DatumPocetka,
                DatumZavrsetka = x.DatumZavrsetka,
                IdFaze = x.IdFaze,
                IdStacka = x.IdStacka
            })
                .SingleOrDefaultAsync(x => x.IdProjekta == id);
           
            projekt.Faza = _context.Faza.Where(s => s.IdFaze == projekt.IdFaze).Select(s => new FazaDTO()
            {
                IdFaze = s.IdFaze,
                Naziv = s.Naziv,
                Opis = s.Opis
            }).SingleOrDefault(o => o.IdFaze == projekt.IdFaze);

            projekt.Stack = _context.TehnoloskiStack.Where(s => s.IdStacka == projekt.IdStacka).Select(s => new StackDTO()
            {
                IdStacka = s.IdStacka,
                Naziv = s.Naziv,
                Opis = s.Opis
            }).SingleOrDefault(o => o.IdStacka == projekt.IdStacka);

            foreach(var t in _context.TehnologijaProjekt)
            {
                if(t.IdProjekta == projekt.IdProjekta)
                {
                    projekt.Tehnologije.Add(_context.Tehnologija.Where(x => x.IdTehnologije == t.IdTehnologije).Select(x => new TehnologijaDTO()
                    {
                        IdTehnologije = x.IdTehnologije,
                        Naziv = x.Naziv,
                        Opis = x.Opis
                    }).SingleOrDefault(s => s.IdTehnologije == t.IdTehnologije));
                }
            }

            foreach (var t in _context.DokumentProjekt)
            {
                if (t.IdProjekta == projekt.IdProjekta)
                {
                    projekt.Dokumenti.Add(_context.Dokument.Where(x => x.IdDokumenta == t.IdDokumenta).Select(x => new DokumentDTO()
                    {
                        IdDokumenta = x.IdDokumenta,
                        Naziv = x.Naziv,
                        Opis = x.Opis,
                        Poveznica = x.Poveznica,
                        ByteArray = x.ByteArray
                    }).SingleOrDefault(s => s.IdDokumenta == t.IdDokumenta));
                }
            }

            foreach (var t in _context.PodrucjeProjekt)
            {
                if (t.IdProjekta == projekt.IdProjekta)
                {
                    projekt.Podrucja.Add(_context.PoslovnoPodrucje.Where(x => x.IdPodrucja == t.IdPodrucja).Select(x => new PodrucjeDTO()
                    {
                        IdPodrucja = x.IdPodrucja,
                        Naziv = x.Naziv,
                        Opis = x.Opis
                    }).FirstOrDefault());
                }
            }

            foreach (var t in _context.OsobaProjekt)
            {
                if (t.IdProjekta == projekt.IdProjekta)
                {
                    projekt.Sudionici.Add(_context.OsobaProjekt.Include(h => h.IdOsobeNavigation).Include(o => o.IdUlogeNavigation).Where(x => x.IdOsobe == t.IdOsobe).Where(x => x.IdProjekta == projekt.IdProjekta).Select(x => new SudionikDTO()
                    {
                        IdOsobe = x.IdOsobe,
                        ImePrezime = x.IdOsobeNavigation.Ime + " " + x.IdOsobeNavigation.Prezime,
                        Oib = x.IdOsobeNavigation.Oib,
                        DatumRodenja = x.IdOsobeNavigation.DatumRodenja,
                        DatumOdlaska = x.IdOsobeNavigation.DatumOdlaska,
                        DatumZaposlenja = x.IdOsobeNavigation.DatumZaposlenja,
                        Email = x.IdOsobeNavigation.Email,
                        Telefon = x.IdOsobeNavigation.Telefon,
                        IdUloge = x.IdUloge,
                        NazivUloge = x.IdUlogeNavigation.Naziv,
                        OpisUloge = x.IdUlogeNavigation.Opis
                    }).FirstOrDefault());
                }
            }


            if (projekt == null)
            {
                return NotFound();
            }

            return Ok(projekt);
        }

        // PUT: api/Projekt/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjekt([FromRoute] int id, [FromBody] ProjektDTO projektDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projektDTO.IdProjekta)
            {
                return BadRequest();
            }

            List<DokumentProjekt> ids1 = _context.DokumentProjekt.Where(x => x.IdProjekta == projektDTO.IdProjekta).ToList();
            List<int> ids2 = projektDTO.Dokumenti.Select(x => x.IdDokumenta).ToList();
            List<DokumentDTO> doks = projektDTO.Dokumenti.ToList();

            for(int i = doks.Count-1; i>-1; i--)
            {
                if(doks[i].IdDokumenta != 0)
                {
                    doks.RemoveAt(i);
                }
            }
            
            foreach(var i in ids1)
            {
                if(!ids2.Contains(i.IdDokumenta))
                {
                    _context.DokumentProjekt.Remove(i);
                }
            }

            DodajDokumente(doks);

            Projekt projekt = _context.Projekt.FirstOrDefault(x => x.IdProjekta == id);
            projekt.Naziv = projektDTO.Naziv;
            projekt.Opis = projektDTO.Opis;
            projekt.KljucneRijeci = projektDTO.KljucneRijeci;
            projekt.IdStacka = projektDTO.IdStacka;
            projekt.IdFaze = projektDTO.IdFaze;
            projekt.DatumPocetka = projektDTO.DatumPocetka;
            projekt.DatumZavrsetka = projektDTO.DatumZavrsetka;
            projekt.IdFazeNavigation = _context.Faza.FirstOrDefault(x => x.IdFaze == projekt.IdFaze);
            projekt.IdStackaNavigation = _context.TehnoloskiStack.FirstOrDefault(x => x.IdStacka == projekt.IdStacka);

            int n = doks.Count;

            List<Dokument> dokumenti = _context.Dokument.OrderByDescending(x => x.IdDokumenta).Take(n).ToList();

            foreach (var i in dokumenti)
            {
               
                DokumentProjekt x = new DokumentProjekt()
                {
                    IdProjekta = projekt.IdProjekta,
                    IdDokumenta = i.IdDokumenta,
                    IdProjektaNavigation = projekt,

                };

                x.IdDokumentaNavigation = _context.Dokument.FirstOrDefault(a => a.IdDokumenta == i.IdDokumenta);
                _context.DokumentProjekt.Add(x);
            }

            List<int> ids = _context.Tehnologija.Select(x => x.IdTehnologije).ToList();
            List<int> novi = projektDTO.Tehnologije.Select(x => x.IdTehnologije).ToList();
            List<int> stari = _context.TehnologijaProjekt.Where(x => x.IdProjekta == projekt.IdProjekta).Select(x => x.IdTehnologije).ToList();
            
            foreach (var i in ids)
            {
               if(novi.Contains(i) && !stari.Contains(i))
                {
                    _context.TehnologijaProjekt.Add(new TehnologijaProjekt()
                    {
                        IdProjekta = projekt.IdProjekta,
                        IdTehnologije = i,
                        IdProjektaNavigation = projekt,
                        IdTehnologijeNavigation = _context.Tehnologija.FirstOrDefault(x => x.IdTehnologije == i)
                    });
                }
               if(!novi.Contains(i) && stari.Contains(i))
                {
                    
                    _context.TehnologijaProjekt.Remove(_context.TehnologijaProjekt.FirstOrDefault(x => x.IdTehnologije == i && x.IdProjekta == projekt.IdProjekta));
                }
            }

            ids = _context.PoslovnoPodrucje.Select(x => x.IdPodrucja).ToList();
            novi = projektDTO.Podrucja.Select(x => x.IdPodrucja).ToList();
            stari = _context.PodrucjeProjekt.Where(x => x.IdProjekta == projekt.IdProjekta).Select(x => x.IdPodrucja).ToList();

            foreach (var i in ids)
            {
                if (novi.Contains(i) && !stari.Contains(i))
                {
                    _context.PodrucjeProjekt.Add(new PodrucjeProjekt()
                    {
                        IdProjekta = projekt.IdProjekta,
                        IdPodrucja = i,
                        IdProjektaNavigation = projekt,
                        IdPodrucjaNavigation = _context.PoslovnoPodrucje.FirstOrDefault(x => x.IdPodrucja == i)
                    });
                }
                if (!novi.Contains(i) && stari.Contains(i))
                {
                    _context.PodrucjeProjekt.Remove(_context.PodrucjeProjekt.FirstOrDefault(x => x.IdPodrucja == i && x.IdProjekta == projekt.IdProjekta));
                }
            }

            

            ids = _context.Osoba.Select(x => x.IdOsobe).ToList();
            novi = projektDTO.Sudionici.Select(x => x.IdOsobe).ToList();
            stari = _context.OsobaProjekt.Where(x => x.IdProjekta == projekt.IdProjekta).Select(x => x.IdOsobe).ToList();

            foreach (var i in ids)
            {
                if (novi.Contains(i) && !stari.Contains(i))
                {
                    _context.OsobaProjekt.Add(new OsobaProjekt()
                    {
                        IdProjekta = projekt.IdProjekta,
                        IdOsobe = i,
                        IdProjektaNavigation = projekt,
                        IdUloge = projektDTO.Sudionici.FirstOrDefault(x => x.IdOsobe == i).IdUloge,
                        IdOsobeNavigation = _context.Osoba.FirstOrDefault(x => x.IdOsobe == i),
                        IdUlogeNavigation = _context.Uloga.FirstOrDefault(x => x.IdUloge == projektDTO.Sudionici.FirstOrDefault(y => y.IdOsobe == i).IdUloge)
                    });
                }
                else if (!novi.Contains(i) && stari.Contains(i))
                {
                    _context.OsobaProjekt.Remove(_context.OsobaProjekt.FirstOrDefault(x => x.IdOsobe == i && x.IdProjekta == projekt.IdProjekta));
                }
                
            }

            _context.Entry(projekt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjektExists(id))
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

        // POST: api/Projekt
        [HttpPost]
        public async Task<IActionResult> PostProjekt([FromBody] ProjektDTO projektDTO)
        {

           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DodajDokumente(projektDTO.Dokumenti);

            Projekt projekt = new Projekt()
            {
                IdProjekta = projektDTO.IdProjekta,
                Naziv = projektDTO.Naziv,
                Opis = projektDTO.Opis,
                KljucneRijeci = projektDTO.KljucneRijeci,
                DatumPocetka = projektDTO.DatumPocetka,
                DatumZavrsetka = projektDTO.DatumZavrsetka,
                IdFaze = projektDTO.IdFaze,
                IdStacka = projektDTO.IdStacka
              
            };

           
            projekt.IdStackaNavigation = _context.TehnoloskiStack.FirstOrDefault(x => x.IdStacka == projekt.IdStacka);
            projekt.IdFazeNavigation = _context.Faza.FirstOrDefault(x => x.IdFaze == projekt.IdFaze);

            foreach(var i in projektDTO.Tehnologije)
            {
                TehnologijaProjekt x = new TehnologijaProjekt()
                {
                    IdProjekta = projekt.IdProjekta,
                    IdTehnologije = i.IdTehnologije,
                    IdProjektaNavigation = projekt,
                    
                };

                x.IdTehnologijeNavigation = _context.Tehnologija.FirstOrDefault(a => a.IdTehnologije == i.IdTehnologije);
                _context.TehnologijaProjekt.Add(x);
            }

            foreach (var i in projektDTO.Podrucja)
            {
               
                PodrucjeProjekt x = new PodrucjeProjekt()
                {
                    IdProjekta = projekt.IdProjekta,
                    IdPodrucja = i.IdPodrucja,
                    IdProjektaNavigation = projekt,

                };

                x.IdPodrucjaNavigation = _context.PoslovnoPodrucje.FirstOrDefault(a => a.IdPodrucja == i.IdPodrucja);
                _context.PodrucjeProjekt.Add(x);
            }

            
            int n = projektDTO.Dokumenti.Count;

            List<Dokument> dokumenti = _context.Dokument.OrderByDescending(x => x.IdDokumenta).Take(n).ToList();

            foreach (var i in dokumenti)
            {
               
                DokumentProjekt x = new DokumentProjekt()
                {
                    IdProjekta = projekt.IdProjekta,
                    IdDokumenta = i.IdDokumenta,
                    IdProjektaNavigation = projekt,

                };

                x.IdDokumentaNavigation = _context.Dokument.FirstOrDefault(a => a.IdDokumenta == i.IdDokumenta);
                _context.DokumentProjekt.Add(x);
            }

            foreach (var i in projektDTO.Sudionici)
            {
                OsobaProjekt x = new OsobaProjekt()
                {
                    IdProjekta = projekt.IdProjekta,
                    IdOsobe = i.IdOsobe,
                    IdProjektaNavigation = projekt,
                    IdUloge = i.IdUloge

                };

                x.IdOsobeNavigation = _context.Osoba.FirstOrDefault(a => a.IdOsobe == i.IdOsobe);
                x.IdUlogeNavigation = _context.Uloga.FirstOrDefault(a => a.IdUloge == i.IdUloge);
                _context.OsobaProjekt.Add(x);

            }

            
            _context.Projekt.Add(projekt);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetProjekt", new { id = projekt.IdProjekta }, projekt);
        }

        // DELETE: api/Projekt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjekt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projekt = await _context.Projekt.FindAsync(id);
            if (projekt == null)
            {
           
                return NotFound();
            }
            
            _context.Projekt.Remove(projekt);
            await _context.SaveChangesAsync();

            return Ok(projekt);
        }

        private bool ProjektExists(int id)
        {
            return _context.Projekt.Any(e => e.IdProjekta == id);
        }

        public void DodajDokumente(List<DokumentDTO> list)
        {
            
            foreach (var d in list)
            {
                Dokument doc = new Dokument()
                {
                    IdDokumenta = d.IdDokumenta,
                    Naziv = d.Naziv,
                    Opis = d.Opis,
                    ByteArray = d.ByteArray,
                    Poveznica = d.Poveznica
                };
                _context.Dokument.Add(doc);

            }
            _context.SaveChanges();
            
        }
    }
}