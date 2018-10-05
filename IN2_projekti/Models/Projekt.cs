using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class Projekt
    {

        public Projekt()
        {
            DokumentProjekt = new HashSet<DokumentProjekt>();
            OsobaProjekt = new HashSet<OsobaProjekt>();
            PodrucjeProjekt = new HashSet<PodrucjeProjekt>();
            TehnologijaProjekt = new HashSet<TehnologijaProjekt>();
            
        }

        public int IdProjekta { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public string KljucneRijeci { get; set; }
        public int? IdStacka { get; set; }
        public int? IdFaze { get; set; }
        public DateTime? DatumPocetka { get; set; }
        public DateTime? DatumZavrsetka { get; set; }
        //public string Faza { get; set; }
        //public string TehnoloskiStack { get; set; }

        public Faza IdFazeNavigation { get; set; }
        public TehnoloskiStack IdStackaNavigation { get; set; }
        public ICollection<DokumentProjekt> DokumentProjekt { get; set; }
        public ICollection<OsobaProjekt> OsobaProjekt { get; set; }
        public ICollection<PodrucjeProjekt> PodrucjeProjekt { get; set; }
        public ICollection<TehnologijaProjekt> TehnologijaProjekt { get; set; }
    }
}
