import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Projekt } from '../../models/projekt';
import { Faza } from '../../models/faza';
import { TehnoloskiStack } from '../../models/tehnoloski-stack';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjektiService } from '../projekti.service';
import { RouterService } from '../../router.service';
import { Tehnologija } from '../../models/tehnologija';
import { PoslovnoPodrucje } from '../../models/poslovno-podrucje';
import { Osoba } from '../../models/osoba';
import { Sudionik } from '../../models/sudionik';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Uloga } from '../../models/uloga';
import { Dokument } from '../../models/dokument';


@Component({
  selector: 'app-uredi-projekt',
  templateUrl: './uredi-projekt.component.html',
  styleUrls: ['./uredi-projekt.component.css']
})
export class UrediProjektComponent implements OnInit {

  projekt: Projekt;
  faze: Faza[];
  stackovi: TehnoloskiStack[];
  url: string;
  public tehnologije: Tehnologija[];
  public tehnologije2: Array<Tehnologija> = new Array<Tehnologija>();
  public podrucja2: Array<PoslovnoPodrucje> = new Array<PoslovnoPodrucje>();

  public podrucja: PoslovnoPodrucje[];
  public osobe: Osoba[];
  public odabraneTehnologije: Array<Tehnologija> = new Array<Tehnologija>();
  public odabranaPodrucja: Array<PoslovnoPodrucje> = new Array<PoslovnoPodrucje>();
  public sudionici: Array<Sudionik> = new Array<Sudionik>();
  public ucitano: boolean = false;
  public odabraneTehnologijeId: Array<number> = new Array<number>();
  public odabranaPodrucjaId: Array<number> = new Array<number>();
  public sudionici2: Array<Sudionik> = new Array<Sudionik>();
  public imena: Array<string> = new Array<string>();
  public tekst: string = "";
  public osoba: Osoba;
  public odabranaUloga: number;
  public uloge: Uloga[];
  public unosDokumenata: boolean = false;
  public noviDokumenti: Array<Dokument> = new Array<Dokument>();
  public stariDokumenti: Array<Dokument> = new Array<Dokument>();
  public dokumenti: Array<Dokument> = new Array<Dokument>();
  public brojac: number;
  public broj: number;
  public noviDok: boolean = false;
  public files: Array<File> = new Array<File>();;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProjektiService, private routerService: RouterService) {

  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.imena.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");

    this.productService.getProjekt(id).subscribe(
      products => {
        this.projekt = products;
      }
    );

    this.productService.getTehnologije().subscribe(
      products => {
        this.tehnologije = products;

      }
    );

    this.productService.getPodrucje().subscribe(
      products => {
        this.podrucja = products;

      }
    );

    this.productService.getFaze().subscribe(
      products => {
        this.faze = products;

      }
    );

    this.productService.getStackovi().subscribe(
      products => {
        this.stackovi = products;

      }
    );

    this.productService.getUloge().subscribe(
      products => {
        this.uloge = products;

      }
    );
    this.productService.getOsobe().subscribe(
      products => {
        this.osobe = products;

      }
    );


  }

  ngDoCheck() {
    this.odabranaPodrucjaId = [];
    this.odabraneTehnologijeId = [];
    this.odabraneTehnologije.forEach(x => {
      this.odabraneTehnologijeId.push(x.idTehnologije);
    })
    this.odabranaPodrucja.forEach(x => {
      this.odabranaPodrucjaId.push(x.idPodrucja);
    })

    

    if (!(typeof (this.imena.find(x => x == this.tekst)) === 'undefined')) {
      this.osoba = this.osobe.find(x => x.imePrezime == this.tekst);
      let sudionik = new Sudionik();
      sudionik.idOsobe = this.osoba.idOsobe;
      sudionik.imePrezime = this.osoba.imePrezime;
      sudionik.oib = this.osoba.oib;
      sudionik.telefon = this.osoba.telefon;
      sudionik.email = this.osoba.email;
      sudionik.datumZaposlenja = this.osoba.datumZaposlenja;
      sudionik.datumRodenja = this.osoba.datumRodenja;
      sudionik.datumOdlaska = this.osoba.datumOdlaska;

      let a = 0;


      this.sudionici.forEach(element => {
        if (element.idOsobe == sudionik.idOsobe) {
          a = 1;
        }
      });

      if (a == 0) {
        console.log("LISTA");
        this.sudionici.push(sudionik);
        console.log(this.sudionici);
      }
      for (var i = 0; i < this.imena.length; i++) {
        if (this.imena[i] == this.tekst) {
          this.imena.splice(i, 1);
        }
      }
      console.log(this.imena);
      this.tekst = "";


    }
  }

  ngAfterContentChecked() { }

  ngAfterViewInit() 
  {
    this.imena = [];
    this.osobe.forEach(element => {
      let a = 0;
      this.projekt.sudionici.forEach(e => {
        if(element.idOsobe == e.idOsobe) {
          a = 1;
        }
      });

      if(a == 0) {
        this.imena.push(element.imePrezime);
      }
      
    });

    this.projekt.tehnologije.forEach(element => {
      this.odabraneTehnologije.push(element);
      this.odabraneTehnologijeId.push(element.idTehnologije);
    });
    this.projekt.podrucja.forEach(element => {
      this.odabranaPodrucja.push(element);
      this.odabranaPodrucjaId.push(element.idPodrucja);
    });

    this.tehnologije.forEach(v => {
      if (this.odabraneTehnologijeId.includes(v.idTehnologije)) {
        v.checked = true;
        this.tehnologije2.push(v);

      }

      else {
        v.checked = false;
        this.tehnologije2.push(v);
      }
    });

    this.podrucja.forEach(v => {
      if (this.odabranaPodrucjaId.includes(v.idPodrucja)) {
        v.checked = true;
        this.podrucja2.push(v);

      }

      else {
        v.checked = false;
        this.podrucja2.push(v);
      }
    });

    this.projekt.sudionici.forEach(element => {
      this.sudionici.push(element);
    });

    this.dokumenti = this.projekt.dokumenti;
    this.ucitano = true;
  }

  ngAfterContentInit() {
    this.projekt.tehnologije.forEach(element => {
      this.odabraneTehnologije.push(element);
      this.odabraneTehnologijeId.push(element.idTehnologije);
    });
    this.projekt.podrucja.forEach(element => {
      this.odabranaPodrucja.push(element);
      this.odabranaPodrucjaId.push(element.idPodrucja);
    });

    this.tehnologije.forEach(v => {
      if (this.odabraneTehnologijeId.includes(v.idTehnologije)) {
        v.checked = true;
        this.tehnologije2.push(v);

      }

      else {
        v.checked = false;
        this.tehnologije2.push(v);
      }
    });

    this.podrucja.forEach(v => {
      if (this.odabranaPodrucjaId.includes(v.idPodrucja)) {
        v.checked = true;
        this.podrucja2.push(v);

      }

      else {
        v.checked = false;
        this.podrucja2.push(v);
      }
    });

    this.projekt.sudionici.forEach(element => {
      this.sudionici.push(element);
    });

    console.log(this.tehnologije2);
    console.log(this.podrucja2);
    this.ucitano = true;
  }

  tehnologijaCheck(tehnologija: Tehnologija, event) {
    if (event.target.checked) {
      this.odabraneTehnologije.push(tehnologija);
      
    } else {
      for (var i = 0; i < this.odabraneTehnologije.length; i++) {
        if (this.odabraneTehnologije[i].idTehnologije == tehnologija.idTehnologije) {
          this.odabraneTehnologije.splice(i, 1);
        }
      }
    }
    console.log(this.odabraneTehnologije);
  }

  makni(s: Sudionik) {
    console.log(this.sudionici);
    for (var i = 0; i < this.sudionici.length; i++) {
      if (this.sudionici[i].idOsobe == s.idOsobe) {
        this.imena.push(this.sudionici[i].imePrezime);
        this.sudionici.splice(i, 1);
        
      }
    }
    console.log(this.sudionici);
    console.log("imena");
    console.log(this.imena);
  }

  podrucjeCheck(tehnologija: PoslovnoPodrucje, event) {
    if (event.target.checked) {
      this.odabranaPodrucja.push(tehnologija);
    } else {
      for (var i = 0; i < this.odabranaPodrucja.length; i++) {
        if (this.odabranaPodrucja[i].idPodrucja == tehnologija.idPodrucja) {
          this.odabranaPodrucja.splice(i, 1);
        }
      }
    }
    console.log(this.odabranaPodrucja);
    

  }

  dodajDokumente(): void {

    this.unosDokumenata = false;
    // this.noviDokumenti.forEach(element => {
    //   this.productService.postDokument(element).subscribe(res => {
    //   }), err => {
    //     console.log("Error: " + err);

    //   };
    // });
    this.stariDokumenti = []
    this.dokumenti.forEach(element => {
      this.stariDokumenti.push(element);

    });
    console.log(this.dokumenti);

  }
  makniDok(s: Dokument) {
    for (var i = 0; i < this.dokumenti.length; i++) {
      if (this.dokumenti[i].naziv == s.naziv) {
        this.dokumenti.splice(i, 1);
        this.brojac--;
      }
    }
    for (var i = 0; i < this.noviDokumenti.length; i++) {
      if (this.noviDokumenti[i].naziv == s.naziv) {
        this.noviDokumenti.splice(i, 1);
        this.broj--;
      }
    }

  }

  dodajDokument(): void {
    // var reader = new FileReader();

    // reader.readAsDataURL(this.files[0]);

    if (typeof this.noviDokumenti[this.broj].naziv === 'undefined') {
      alert("Naziv je obavezan");
    }

    else {
      // if (this.files.length > 0) {
      //   reader.onload = function(e) {
      //     var arrayBuffer  = reader.result;
      //     return arrayBuffer
      //   }
        
      //   reader.readAsArrayBuffer(this.files[0]);
      //  //this.buffer = arrayBuffer

        
      // }
      
      this.noviDok = false;
      this.dokumenti[this.brojac] = this.noviDokumenti[this.broj];

      this.broj++;
      this.brojac++;
      this.files = [];
    }

  }

  noviDokument(): void {
    this.noviDok = true;
    this.noviDokumenti[this.broj] = new Dokument();
  }

  odustaniDokumenti(): void {
    this.unosDokumenata = false;
    this.noviDok = false;
    this.dokumenti = []
    this.stariDokumenti.forEach(element => {
      this.dokumenti.push(element);
    });

  }

  unesiDokumente(): void {
    this.files = []
    this.unosDokumenata = true;
    this.brojac = this.dokumenti.length;
    this.noviDokumenti = [];
    this.broj = 0;

  }

  onChange(event) {
    this.files = event.srcElement.files;
    console.log(this.files);
    // var reader = new FileReader();
    // reader.onloadend = function(e) {
    //   console.log(reader.result);
    // }
    // reader.readAsDataURL(this.files[0]);


  }

  dodaj(): void {
    if (this.projekt.naziv != null) {
      this.sudionici.forEach(element => {
        if (typeof element.nazivUloge === 'undefined') {
          alert("Svaki sudionik treba imati ulogu!");
          return;
        }
        element.idUloge = this.uloge.find(x => x.naziv == element.nazivUloge).idUloge;
        element.opisUloge = this.uloge.find(x => x.naziv == element.nazivUloge).opis;

        this.sudionici2.push(element);

      });
      this.projekt.sudionici = [];
      this.projekt.sudionici = this.sudionici2;
      this.projekt.tehnologije = [];

      for (var i = 0; i < this.tehnologije.length; i++) {
        if (this.odabraneTehnologijeId.includes(this.tehnologije[i].idTehnologije)) {
          this.projekt.tehnologije.push(this.tehnologije[i]);
        }

      }

      this.projekt.podrucja = [];
      for (var i = 0; i < this.podrucja.length; i++) {
        if (this.odabranaPodrucjaId.includes(this.podrucja[i].idPodrucja)) {
          this.projekt.podrucja.push(this.podrucja[i]);
        }

      }

      this.projekt.dokumenti = this.dokumenti;
      console.log(this.projekt.dokumenti)
      this.productService.putProjekt(this.projekt).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate([url]);
      }), err => {
        console.log("Error: " + err);

      };
    } else {
      alert("Naziv je obavezno polje!");
    }

  }

  odustani(): void {
    let url = this.routerService.getPreviousUrl();
    this.router.navigate([url]);
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

}
