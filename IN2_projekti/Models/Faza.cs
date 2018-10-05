using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class Faza
    {
        public Faza()
        {
            Projekt = new HashSet<Projekt>();
        }

        public int IdFaze { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }

        public ICollection<Projekt> Projekt { get; set; }
    }
}
