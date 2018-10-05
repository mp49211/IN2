using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class OsobaProjekt
    {
        public int Id { get; set; }
        public int IdOsobe { get; set; }
        public int IdProjekta { get; set; }
        public int IdUloge { get; set; }

        public Osoba IdOsobeNavigation { get; set; }
        public Projekt IdProjektaNavigation { get; set; }
        public Uloga IdUlogeNavigation { get; set; }
    }
}
