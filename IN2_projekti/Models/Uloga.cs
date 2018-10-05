using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class Uloga
    {
        public Uloga()
        {
            OsobaProjekt = new HashSet<OsobaProjekt>();
        }

        public int IdUloge { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }

        public ICollection<OsobaProjekt> OsobaProjekt { get; set; }
    }
}
