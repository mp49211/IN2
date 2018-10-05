using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IN2_projekti.Models
{
    public partial class In2Context : DbContext
    {
        public In2Context()
        {
        }

        public In2Context(DbContextOptions<In2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Dokument> Dokument { get; set; }
        public virtual DbSet<DokumentProjekt> DokumentProjekt { get; set; }
        public virtual DbSet<Faza> Faza { get; set; }
        public virtual DbSet<Osoba> Osoba { get; set; }
        public virtual DbSet<OsobaProjekt> OsobaProjekt { get; set; }
        public virtual DbSet<PodrucjeProjekt> PodrucjeProjekt { get; set; }
        public virtual DbSet<PoslovnoPodrucje> PoslovnoPodrucje { get; set; }
        public virtual DbSet<Projekt> Projekt { get; set; }
        public virtual DbSet<Tehnologija> Tehnologija { get; set; }
        public virtual DbSet<TehnologijaProjekt> TehnologijaProjekt { get; set; }
        public virtual DbSet<TehnoloskiStack> TehnoloskiStack { get; set; }
        public virtual DbSet<Uloga> Uloga { get; set; }

     

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        //            if (!optionsBuilder.IsConfigured)
        //            {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //                optionsBuilder.UseSqlServer("Server=zg-sql2014-01\\sql2016;Database=EvidencijaIN2ProjekataStud;Trusted_Connection=True;");
        //            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dokument>(entity =>
            {
                entity.HasKey(e => e.IdDokumenta);

                entity.Property(e => e.IdDokumenta).HasColumnName("idDokumenta");

                entity.Property(e => e.ByteArray).HasColumnName("dokument");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(200);

                entity.Property(e => e.Opis).HasColumnName("opis");

                entity.Property(e => e.Poveznica)
                    .HasColumnName("poveznica")
                    .HasMaxLength(2000);
            });

            

            modelBuilder.Entity<DokumentProjekt>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdDokumenta).HasColumnName("idDokumenta");

                entity.Property(e => e.IdProjekta).HasColumnName("idProjekta");

                entity.HasOne(d => d.IdDokumentaNavigation)
                    .WithMany(p => p.DokumentProjekt)
                    .HasForeignKey(d => d.IdDokumenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DokumentProjekt_Dokument");

                entity.HasOne(d => d.IdProjektaNavigation)
                    .WithMany(p => p.DokumentProjekt)
                    .HasForeignKey(d => d.IdProjekta)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_DokumentProjekt_Projekt");
            });

            modelBuilder.Entity<Faza>(entity =>
            {
                entity.HasKey(e => e.IdFaze);

                entity.Property(e => e.IdFaze).HasColumnName("idFaze");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(200);

                entity.Property(e => e.Opis)
                    .HasColumnName("opis")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Osoba>(entity =>
            {
                entity.HasKey(e => e.IdOsobe);

                entity.Property(e => e.IdOsobe).HasColumnName("idOsobe");

                entity.Property(e => e.DatumOdlaska)
                    .HasColumnName("datumOdlaska")
                    .HasColumnType("date");

                entity.Property(e => e.DatumRodenja)
                    .HasColumnName("datumRodenja")
                    .HasColumnType("date");

                entity.Property(e => e.DatumZaposlenja)
                    .HasColumnName("datumZaposlenja")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Ime)
                    .IsRequired()
                    .HasColumnName("ime")
                    .HasMaxLength(200);

                entity.Property(e => e.Oib)
                    .IsRequired()
                    .HasColumnName("oib")
                    .HasMaxLength(50);

                entity.Property(e => e.Prezime)
                    .IsRequired()
                    .HasColumnName("prezime")
                    .HasMaxLength(200);

                entity.Property(e => e.Telefon)
                    .HasColumnName("telefon")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<OsobaProjekt>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdOsobe).HasColumnName("idOsobe");

                entity.Property(e => e.IdProjekta).HasColumnName("idProjekta");

                entity.Property(e => e.IdUloge).HasColumnName("idUloge");

                entity.HasOne(d => d.IdOsobeNavigation)
                    .WithMany(p => p.OsobaProjekt)
                    .HasForeignKey(d => d.IdOsobe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OsobaProjekt_Osoba");

                entity.HasOne(d => d.IdProjektaNavigation)
                    .WithMany(p => p.OsobaProjekt)
                    .HasForeignKey(d => d.IdProjekta)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_OsobaProjekt_Projekt");

                entity.HasOne(d => d.IdUlogeNavigation)
                    .WithMany(p => p.OsobaProjekt)
                    .HasForeignKey(d => d.IdUloge)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OsobaProjekt_Uloga");
            });

            modelBuilder.Entity<PodrucjeProjekt>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdPodrucja).HasColumnName("idPodrucja");

                entity.Property(e => e.IdProjekta).HasColumnName("idProjekta");

                entity.HasOne(d => d.IdPodrucjaNavigation)
                    .WithMany(p => p.PodrucjeProjekt)
                    .HasForeignKey(d => d.IdPodrucja)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PodrucjeProjekt_PoslovnoPodrucje");

                entity.HasOne(d => d.IdProjektaNavigation)
                    .WithMany(p => p.PodrucjeProjekt)
                    .HasForeignKey(d => d.IdProjekta)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PodrucjeProjekt_Projekt");
            });

            modelBuilder.Entity<PoslovnoPodrucje>(entity =>
            {
                entity.HasKey(e => e.IdPodrucja);

                entity.Property(e => e.IdPodrucja).HasColumnName("idPodrucja");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(200);

                entity.Property(e => e.Opis)
                    .HasColumnName("opis")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Projekt>(entity =>
            {
                entity.HasKey(e => e.IdProjekta);

                entity.Property(e => e.IdProjekta).HasColumnName("idProjekta");

                entity.Property(e => e.DatumPocetka)
                    .HasColumnName("datumPocetka")
                    .HasColumnType("date");

                entity.Property(e => e.DatumZavrsetka)
                    .HasColumnName("datumZavrsetka")
                    .HasColumnType("date");

                entity.Property(e => e.IdFaze).HasColumnName("idFaze");

                entity.Property(e => e.IdStacka).HasColumnName("idStacka");

                entity.Property(e => e.KljucneRijeci).HasColumnName("kljucneRijeci");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Opis).HasColumnName("opis");

                entity.HasOne(d => d.IdFazeNavigation)
                    .WithMany(p => p.Projekt)
                    .HasForeignKey(d => d.IdFaze)
                    .HasConstraintName("FK_Projekt_Faza");

                entity.HasOne(d => d.IdStackaNavigation)
                    .WithMany(p => p.Projekt)
                    .HasForeignKey(d => d.IdStacka)
                    .HasConstraintName("FK_Projekt_TehnoloskiStack");
            });

            modelBuilder.Entity<Tehnologija>(entity =>
            {
                entity.HasKey(e => e.IdTehnologije);

                entity.Property(e => e.IdTehnologije).HasColumnName("idTehnologije");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(200);

                entity.Property(e => e.Opis)
                    .HasColumnName("opis")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<TehnologijaProjekt>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdProjekta).HasColumnName("idProjekta");

                entity.Property(e => e.IdTehnologije).HasColumnName("idTehnologije");

                entity.HasOne(d => d.IdProjektaNavigation)
                    .WithMany(p => p.TehnologijaProjekt)
                    .HasForeignKey(d => d.IdProjekta)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TehnologijaProjekt_Projekt");

                entity.HasOne(d => d.IdTehnologijeNavigation)
                    .WithMany(p => p.TehnologijaProjekt)
                    .HasForeignKey(d => d.IdTehnologije)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TehnologijaProjekt_Tehnologija");
            });

            modelBuilder.Entity<TehnoloskiStack>(entity =>
            {
                entity.HasKey(e => e.IdStacka);

                entity.Property(e => e.IdStacka).HasColumnName("idStacka");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(200);

                entity.Property(e => e.Opis)
                    .HasColumnName("opis")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Uloga>(entity =>
            {
                entity.HasKey(e => e.IdUloge);

                entity.Property(e => e.IdUloge).HasColumnName("idUloge");

                entity.Property(e => e.Naziv)
                    .IsRequired()
                    .HasColumnName("naziv")
                    .HasMaxLength(200);

                entity.Property(e => e.Opis)
                    .HasColumnName("opis")
                    .HasMaxLength(200);
            });

            //foreach(var x in Dokument)
            //{

            //}
        }
    }
}
