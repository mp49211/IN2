using System;
using System.Collections.Generic;

namespace IN2_projekti.Models
{
    public partial class DokumentProjekt
    {
        public DokumentProjekt() { }
        public int Id { get; set; }
        public int IdProjekta { get; set; }
        public int IdDokumenta { get; set; }

        public Dokument IdDokumentaNavigation { get; set; }
        public Projekt IdProjektaNavigation { get; set; }
    }
}
