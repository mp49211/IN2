using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IN2_projekti.Models
{
    public class ProjektDTO
    {
        public ProjektDTO()
        {
            Tehnologije = new List<TehnologijaDTO>();
            Podrucja = new List<PodrucjeDTO>();
            Dokumenti = new List<DokumentDTO>();
            Sudionici = new List<SudionikDTO>();
        }

        public int IdProjekta { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public string KljucneRijeci { get; set; }

        public DateTime? DatumPocetka { get; set; }
        public DateTime? DatumZavrsetka { get; set; }
        public int? IdFaze { get; set; }
        public int? IdStacka { get; set; }
        public FazaDTO Faza { get; set; }
        public StackDTO Stack { get; set; }

        public List<TehnologijaDTO> Tehnologije { get; set; }
        public List<PodrucjeDTO> Podrucja { get; set; }
        public List<DokumentDTO> Dokumenti { get; set; }
        public List<SudionikDTO> Sudionici { get; set; }
    }
}
