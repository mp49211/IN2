import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjektiService } from '../projekti.service';
import { Projekt } from '../../models/projekt';
import { Faza } from '../../models/faza';
import { TehnoloskiStack } from '../../models/tehnoloski-stack';
import { Sudionik } from '../../models/sudionik';
import { Osoba } from '../../models/osoba';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
// import { FormControl } from '@angular/forms';
// import { Observable, Subject } from 'rxjs';
// import { startWith, map, debounceTime, distinctUntilChanged, tap, switchMap, finalize } from 'rxjs/operators';


@Component({
  selector: 'projekti-lista',
  templateUrl: './projekti-lista.component.html',
  styleUrls: ['./projekti-lista.component.css'],
  providers: [ProjektiService]
})
export class ProjektiListaComponent implements OnInit {

  public projekti: Projekt[];
  public osobe: Osoba[];
  public faze: Faza[];
  public stackovi: TehnoloskiStack[];
  public sudionik: Osoba;
  public odabranaFaza: number;
  public odabraniStack: number;
  public filtriraniProjekti: Projekt[] = [];
  public filtriraniProjekti2: Projekt[] = [];

  public sudionici: Sudionik[];
  public tekst: string = "";
  public imena: Array<string> = new Array<string>();



  constructor(private productService: ProjektiService) {

  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.imena.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngOnInit() {

    this.productService.getProducts().subscribe(
      products => {
        this.projekti = products;

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

    this.productService.getOsobe().subscribe(
      products => {
        this.osobe = products;

      }
    );
  }

  ngDoCheck() {
    this.imena = [];
    this.osobe.forEach(element => {
      this.imena.push(element.imePrezime);
    });
  }



  pretrazi(): void {
    this.sudionik = this.osobe.find(x =>
      x.imePrezime == this.tekst
    );

    this.filtriraniProjekti = [];
    this.filtriraniProjekti2 = [];

    this.projekti.forEach(p => {
      if (this.tekst == "") {
        this.filtriraniProjekti2.push(p);
      }

      else {
        p.sudionici.forEach(element => {
          if (element.imePrezime == this.tekst) {
            this.filtriraniProjekti2.push(p);
          }
        });
      }

    })
    this.filtriraniProjekti2.forEach(p => {

      if ((p.faza.idFaze == this.odabranaFaza || this.odabranaFaza == null) && (p.stack.idStacka == this.odabraniStack || this.odabraniStack == null)) {
        this.filtriraniProjekti.push(p);
      }


    });

  }

}
