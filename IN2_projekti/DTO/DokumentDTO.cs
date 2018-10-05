using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IN2_projekti.Models
{
    public class DokumentDTO
    {
        public DokumentDTO() { }
        public int IdDokumenta { get; set; }
        public string Naziv { get; set; }
        public string Poveznica { get; set; }
        public byte[] ByteArray { get; set; }
        public string Opis { get; set; }
        public int IdProjekta { get; set; }
    }
}
