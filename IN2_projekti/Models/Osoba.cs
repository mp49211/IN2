using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class Osoba
    {
        public Osoba()
        {
            OsobaProjekt = new HashSet<OsobaProjekt>();
        }

        public int IdOsobe { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Oib { get; set; }
        public DateTime? DatumRodenja { get; set; }
        public DateTime? DatumZaposlenja { get; set; }
        public string Email { get; set; }
        public string Telefon { get; set; }
        public DateTime? DatumOdlaska { get; set; }

        public ICollection<OsobaProjekt> OsobaProjekt { get; set; }
    }
}
