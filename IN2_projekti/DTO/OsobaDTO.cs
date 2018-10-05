using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IN2_projekti.DTO
{
    public class OsobaDTO
    {
        public OsobaDTO() { }
        public int IdOsobe { get; set; }
        public string ImePrezime { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Oib { get; set; }
        public DateTime? DatumRodenja { get; set; }
        public DateTime? DatumZaposlenja { get; set; }
        public string Email { get; set; }
        public string Telefon { get; set; }
        public DateTime? DatumOdlaska { get; set; }
    }
}
