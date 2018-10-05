using IN2_projekti.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IN2_projekti.Mapping
{
    public class ProjektMapper
    {
        //public IEnumerable<ProjektDTO> projektiDTO;

        //public IEnumerable<ProjektDTO> MapProjekti(In2Context _context)
        //{

        //    IEnumerable<Projekt> projekti = _context.Projekt.Include(x => x.IdStackaNavigation).Include(x => x.IdFazeNavigation);

        //    IEnumerable<ProjektDTO> books = projekti.Select(x => new ProjektDTO()
        //    {
        //        IdProjekta = x.IdProjekta,
        //        Naziv = x.Naziv,
        //        Opis = x.Opis,
        //        KljucneRijeci = x.KljucneRijeci,
        //        DatumPocetka = x.DatumPocetka,
        //        DatumZavrsetka = x.DatumZavrsetka,
        //        Faza = x.IdFazeNavigation,
        //        Stack = x.IdStackaNavigation
        //    });

        //    foreach (var p in books)
        //    {
        //        foreach (var t in _context.TehnologijaProjekt.Include(x => x.IdTehnologijeNavigation))
        //        {
        //            if (t.IdProjekta == p.IdProjekta)
        //            {
        //                p.Tehnologije.Add(t.IdTehnologijeNavigation);
        //            }
        //        }
        //        foreach (var t in _context.PodrucjeProjekt.Include(x => x.IdPodrucjaNavigation))
        //        {
        //            if (t.IdProjekta == p.IdProjekta)
        //            {
        //                p.Podrucja.Add(t.IdPodrucjaNavigation);
        //            }
        //        }
        //        foreach (var t in _context.OsobaProjekt.Include(x => x.IdOsobeNavigation).Include(x => x.IdUlogeNavigation))
        //        {
        //            if (t.IdProjekta == p.IdProjekta)
        //            {
        //                p.Sudionici.Add(t.IdOsobeNavigation, t.IdUlogeNavigation);
        //            }
        //        }

        //        foreach (var t in _context.DokumentProjekt.Include(x => x.IdDokumentaNavigation))
        //        {
        //            if (t.IdProjekta == p.IdProjekta)
        //            {
        //                p.Dokumenti.Add(t.IdDokumentaNavigation);
        //            }
        //        }
        //    }
            
        //    projektiDTO = books.ToList();
        //    return projektiDTO;
        //}

        //public ProjektDTO MapProjekt(Projekt p)
        //{
        //    return projektiDTO.ToList().Find(x => x.IdProjekta == p.IdProjekta);
        //}

    }
}
