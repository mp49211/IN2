using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class PodrucjeProjekt
    {
        public int Id { get; set; }
        public int IdProjekta { get; set; }
        public int IdPodrucja { get; set; }

        public PoslovnoPodrucje IdPodrucjaNavigation { get; set; }
        public Projekt IdProjektaNavigation { get; set; }
    }
}
