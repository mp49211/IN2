import { Component, OnInit } from '@angular/core';
import { ProjektiService } from '../projekti.service';
import { Faza } from '../../models/faza';
import { TehnoloskiStack } from '../../models/tehnoloski-stack';
import { Tehnologija } from '../../models/tehnologija';
import { PoslovnoPodrucje } from '../../models/poslovno-podrucje';
import { Osoba } from '../../models/osoba';
import { Projekt } from '../../models/projekt';
import { RouterService } from '../../router.service';
import { Router } from '@angular/router';
import { Uloga } from '../../models/uloga';
import { Sudionik } from '../../models/sudionik';
import { Observable, bindCallback } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, buffer } from 'rxjs/operators';
import { Dokument } from '../../models/dokument';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'novi-projekt',
  templateUrl: './novi-projekt.component.html',
  styleUrls: ['./novi-projekt.component.css']
})
export class NoviProjektComponent implements OnInit {


  public faze: Faza[];
  public stackovi: TehnoloskiStack[];
  public tehnologije: Tehnologija[];
  public podrucja: PoslovnoPodrucje[];
  public osobe: Osoba[];
  public odabraneTehnologije: Array<Tehnologija> = new Array<Tehnologija>();
  public odabranaPodrucja: Array<PoslovnoPodrucje> = new Array<PoslovnoPodrucje>();
  public uloge: Uloga[];
  public projekt: Projekt = new Projekt();
  public sudionici: Array<Sudionik> = new Array<Sudionik>();
  public tekst: string = "";
  public sudionici2: Array<Sudionik> = new Array<Sudionik>();
  public imena: Array<string> = new Array<string>();
  public osoba: Osoba;
  public odabranaUloga: number;
  public unosDokumenata: boolean = false;
  public noviDok: boolean = false;
  public dokumenti: Array<Dokument> = new Array<Dokument>();
  public brojac: number;
  public noviDokumenti: Array<Dokument> = new Array<Dokument>();
  public broj: number;
  public stariDokumenti: Array<Dokument> = new Array<Dokument>();
  form: FormGroup;
  public files: Array<File> = new Array<File>();
  public buffer: ArrayBuffer;
  public reader: FileReader = new FileReader();
  public array: Int8Array;

  // afuConfig = {
  //   uploadAPI: {
  //     url: "https://example-file-upload-api"
  //   },
  //   hideProgressBar: true,
  //   hideResetBtn: true,
  //   formatsAllowed: ".pdf,.doc,.docx"
  // };
  // public faza: number;
  // public stack: number;


  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {

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

    this.productService.getOsobe().subscribe(
      products => {
        this.osobe = products;

      }
    );

    this.productService.getUloge().subscribe(
      products => {
        this.uloge = products;

      }
    );

  }

  ngDoCheck() {
    this.imena = [];
    this.osobe.forEach(element => {
      let a = 0;
      this.sudionici.forEach(e => {
        if (element.idOsobe == e.idOsobe) {
          a = 1;
        }
      });

      if (a == 0) {
        this.imena.push(element.imePrezime);
      }

    });

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
        this.sudionici.push(sudionik);
      }
      for (var i = 0; i < this.imena.length; i++) {

        if (this.imena[i] == this.tekst) {
          this.imena.splice(i, 1);
        }
      }
      this.tekst = "";
    }
  }

  // onFileChange(event) {
  //   if(event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     this.form.get('avatar').setValue(file);
  //   }
  // }


  dodajDokumente(): void {

    this.unosDokumenata = false;

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
    console.log(this.files[0]);
    console.log(this.noviDokumenti[this.broj].byteArray)

    if (typeof this.noviDokumenti[this.broj].naziv === 'undefined') {
      alert("Naziv je obavezan");
    }

    else {
     
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
    this.noviDokumenti[this.broj].idProjekta = this.projekt.idProjekta;
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

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.imena.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

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

      this.projekt.sudionici = this.sudionici2;
      this.projekt.podrucja = this.odabranaPodrucja;
      this.projekt.tehnologije = this.odabraneTehnologije;
      this.projekt.dokumenti = this.dokumenti;
      
      this.productService.postProjekt(this.projekt).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate([url]);
      }), err => {
        console.log("Error: " + err);

      };

     
    } else {
      alert("Naziv je obavezno polje!");
    }

  }

  makni(s: Sudionik) {
    for (var i = 0; i < this.sudionici.length; i++) {
      if (this.sudionici[i].idOsobe == s.idOsobe) {
        this.sudionici.splice(i, 1);
        this.imena.push(this.sudionici[i].imePrezime);
      }
    }

   
  }

  tehnologijaCheck(tehnologija: Tehnologija, event) {
    if (event.target.checked) {
      this.odabraneTehnologije.push(tehnologija);
      for (var i = 0; i < this.tehnologije.length; i++) {
        if (this.tehnologije[i].idTehnologije == tehnologija.idTehnologije) {
          this.tehnologije[i].checked = true;
        }
      }
    } else {
      for (var i = 0; i < this.tehnologije.length; i++) {
        if (this.odabraneTehnologije[i] == tehnologija) {
          this.odabraneTehnologije.splice(i, 1);
        }
      }
    }
    console.log(this.odabraneTehnologije);

  }

  onChange(event) {
    this.files = event.srcElement.files;
    var dok = this.noviDokumenti[this.broj]
    var reader = new FileReader();
    reader.onloadend = function(e) {
      console.log(reader.result);
      var result = reader.result;
      if(!(typeof result === 'string')) {
        var typed_array = new Int8Array(result);
        dok.byteArray = typed_array
        console.log(typed_array);
        console.log(result.byteLength);
      }
    }

    reader.readAsArrayBuffer(this.files[0]);

    // this.array = reader.onloadend;
    // console.log(x);
    


    
   


  }

  podrucjeCheck(tehnologija: PoslovnoPodrucje, event) {
    if (event.target.checked) {
      this.odabranaPodrucja.push(tehnologija);
      for (var i = 0; i < this.podrucja.length; i++) {
        if (this.podrucja[i].idPodrucja == tehnologija.idPodrucja) {
          this.podrucja[i].checked = true;
        }
      }
    } else {
      for (var i = 0; i < this.tehnologije.length; i++) {
        if (this.odabranaPodrucja[i] == tehnologija) {
          this.odabranaPodrucja.splice(i, 1);
        }
      }
    }
    console.log(this.odabranaPodrucja);


  }

  odustani(): void {
    let url = this.routerService.getPreviousUrl();
    this.router.navigate([url]);
  }

}
