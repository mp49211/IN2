using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IN2_projekti.Models
{
    public class SudionikDTO
    {
        public SudionikDTO() { }
        public int IdOsobe { get; set; }
        public string ImePrezime { get; set; }
        public string Oib { get; set; }
        public DateTime? DatumRodenja { get; set; }
        public DateTime? DatumZaposlenja { get; set; }
        public string Email { get; set; }
        public string Telefon { get; set; }
        public DateTime? DatumOdlaska { get; set; }
        public int IdUloge { get; set; }
        public string NazivUloge { get; set; }
        public string OpisUloge { get; set; }
    }
}
