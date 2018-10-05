import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjektiService } from '../projekti.service';
import { Projekt } from '../../models/projekt';

// import { FormControl } from '@angular/forms';
// import { Observable, Subject } from 'rxjs';
// import { startWith, map, debounceTime, distinctUntilChanged, tap, switchMap, finalize } from 'rxjs/operators';
import { PoslovnoPodrucje } from '../../models/poslovno-podrucje';
import { Tehnologija } from '../../models/tehnologija';
import { Faza } from '../../models/faza';
import { TehnoloskiStack } from '../../models/tehnoloski-stack';
import { Sudionik } from '../../models/sudionik';
import { Osoba } from '../../models/osoba';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'lista-projekata',
  templateUrl: './lista-projekata.component.html',
  styleUrls: ['./lista-projekata.component.css'],
  providers: [ProjektiService]
})
export class ListaProjekataComponent implements OnInit {
  public osobe: Osoba[];
  public sudionici: Sudionik[];
  public projekti: Projekt[];
  public podrucja: PoslovnoPodrucje[];
  public tehnologije: Tehnologija[];
  public odabranoPodrucje: number = -1;
  public odabranaTehnologija: number = -1;
  public filtriraniProjekti: Projekt[] = [];
  public filtriraniProjekti2: Projekt[] = [];
  public filtriraniProjekti3: Projekt[] = [];
  public faze: Faza[];
  public stackovi: TehnoloskiStack[];
  public stackovi2: Array<TehnoloskiStack> = new Array<TehnoloskiStack>();
  public pomStackovi: Array<TehnoloskiStack> = new Array<TehnoloskiStack>();

  public faze2: Array<Faza> = new Array<Faza>();
  public pomFaze: Array<Faza> = new Array<Faza>();
  public tehnologije2: Array<Tehnologija> = new Array<Tehnologija>();
  public podrucja2: Array<PoslovnoPodrucje> = new Array<PoslovnoPodrucje>();
  public kljucnaRijec: string;
  public x: string;
  public sudionik: Osoba;
  public odabranaFaza: number = -1;
  public odabraniStack: number = -1;
  public tekst: string = "";
  public imena: Array<string> = new Array<string>();
  public imenaFilt: Array<string> = new Array<string>();
  public pomImena: Array<string> = new Array<string>();
  public pretraga1: boolean = false;
  public pretraga2: boolean = false;
  public gumbi: boolean = true;
  public sveFaze: boolean = true;
  productSortOrder: boolean;
  fazeSortOrder: boolean;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router) {

  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.imenaFilt.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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
    this.productService.getOsobe().subscribe(
      products => {
        this.osobe = products;
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
  }

  ngDoCheck() {

    this.imena = [];
    this.osobe.forEach(element => {
      this.imena.push(element.imePrezime);
    });
    this.imenaFilt = this.imena;
   
    this.filtriraj1();

  }
  ngAfterContentInit() {}
  ngAfterContentChecked() {}
  ngAfterViewInit() {
    this.stackovi2 = [];
    this.faze2 = [];
    this.faze2 = this.faze;
    this.stackovi2 = this.stackovi;
  }



  postaviPretragu1() {
    this.pretraga1 = true;
    this.gumbi = false;
  }

  postaviPretragu2() {
    this.pretraga2 = true;
    this.gumbi = false;
  }

  noviProjekt() {
    this.router.navigate(['/novi-projekt']);
  }

  novaPretraga() {
    this.pretraga1 = false;
    this.pretraga2 = false;
    this.filtriraniProjekti3 = [];
    this.gumbi = true;
    this.odabranaFaza = -1;
    this.odabranaTehnologija = -1;
    this.odabraniStack = -1;
    this.odabranoPodrucje = -1;
    this.stackovi2 = this.stackovi;
    this.faze2 = this.faze;
    this.tekst =""

  }

  sortProjekt<T>(prop: (c: Projekt) => T, order: "ASC" | "DESC"): void {
    this.filtriraniProjekti3.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.filtriraniProjekti3.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }
  sortFaze<T>(prop: (c: Faza) => T, order: "ASC" | "DESC"): void {
    this.faze2.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.faze2.reverse();
      this.fazeSortOrder = true;
    } else {
      this.fazeSortOrder = false;
    }
  }

  pretrazi(): void {
    if (this.pretraga1) {
      this.sudionik = this.osobe.find(x =>
        x.imePrezime == this.tekst
      );

      this.filtriraniProjekti = [];
      this.filtriraniProjekti3 = [];

      this.projekti.forEach(p => {
        if (this.tekst == "") {
          this.filtriraniProjekti.push(p);
        }

        else {
          p.sudionici.forEach(element => {
            if (element.imePrezime == this.tekst) {
              this.filtriraniProjekti.push(p);
            }
          });
        }

      })
      this.filtriraniProjekti.forEach(p => {

        if ((p.faza.idFaze == this.odabranaFaza || this.odabranaFaza == -1) && (p.stack.idStacka == this.odabraniStack || this.odabraniStack == -1)) {
          this.filtriraniProjekti3.push(p);
        }


      });
    }


    if (this.pretraga2) {
      this.filtriraniProjekti = [];
      this.filtriraniProjekti2 = [];
      this.filtriraniProjekti3 = [];

      if (this.kljucnaRijec == null || typeof (this.kljucnaRijec) === undefined) {
        this.projekti.forEach(element => {
          this.filtriraniProjekti.push(element);
        });
      }
      else {
        this.projekti.forEach(p => {
          if (p.kljucneRijeci != null) {
            if (p.kljucneRijeci.toLowerCase().includes(this.kljucnaRijec.toLowerCase())) {
              this.filtriraniProjekti.push(p);
            }
          }
        })
      }

      if (this.odabranaTehnologija == -1 || typeof (this.odabranaTehnologija) == undefined) {
        this.filtriraniProjekti.forEach(a => {
          this.filtriraniProjekti2.push(a);
        })
      }
      else {
        this.filtriraniProjekti.forEach(p => {
          p.tehnologije.forEach(element => {
            if (element.idTehnologije == this.odabranaTehnologija) {
              this.filtriraniProjekti2.push(p);
            }
          });
        })
      }

      if (this.odabranoPodrucje == -1 || typeof (this.odabranoPodrucje) == undefined) {
        this.filtriraniProjekti2.forEach(a => {
          this.filtriraniProjekti3.push(a);
        })
      }
      else {
        this.filtriraniProjekti2.forEach(p => {
          p.podrucja.forEach(element => {
            if (element.idPodrucja == this.odabranoPodrucje) {
              this.filtriraniProjekti3.push(p);
            }
          });
        })
      }

    }
    this.sortProjekt(p => p.naziv, "ASC");
  }

  filtriraj1() {
   
    if (this.odabranaFaza != -1 && this.odabraniStack != -1) {
      this.imenaFilt = [];
      this.projekti.forEach(element => {
        if(element.faza.idFaze == this.odabranaFaza && element.stack.idStacka == this.odabraniStack) {
          element.sudionici.forEach(s => {
            if(!this.imenaFilt.includes(s.imePrezime)) {
              this.imenaFilt.push(s.imePrezime);
            }
          });
        }
      });
    }

    else if (this.odabranaFaza != -1 && this.imena.includes(this.tekst)) {
      this.stackovi2 = [];
      this.projekti.forEach(element => {
        let b = 0;
        element.sudionici.forEach(s => {
          if(s.imePrezime == this.tekst) {
            b++;
          }
        });

        if(b != 0 && element.faza.idFaze == this.odabranaFaza) {
          let b = 0;
          this.stackovi2.forEach(s => {
            if(s.idStacka == element.stack.idStacka) {
              b++;
            }
          });
          if(b == 0) {
            this.stackovi2.push(element.stack);
          }
        }
      });
    }

    else if (this.odabraniStack != -1 && this.imena.includes(this.tekst)) {
      this.faze2 = [];
      this.projekti.forEach(element => {
        let b = 0;
        element.sudionici.forEach(s => {
          if(s.imePrezime == this.tekst) {
            b++;
          }
        });

        if(b != 0 && element.stack.idStacka == this.odabraniStack) {
          let b = 0;
          this.faze2.forEach(s => {
            if(s.idFaze == element.faza.idFaze) {
              b++;
            }
          });
          if(b == 0) {
            this.faze2.push(element.faza);
          }
        }
      });
      this.sortFaze(p => p.idFaze, "ASC");
    }

    else if(this.imena.includes(this.tekst)) {
      this.faze2 = [];
      this.stackovi2 = [];

      this.projekti.forEach(element => {
        let b = 0;
        element.sudionici.forEach(s => {
          if(s.imePrezime == this.tekst) {
            b++;
          }
        });

        if(b > 0) {
          let f = 0;
          let s = 0;
          this.faze2.forEach(fa => {
            if(fa.idFaze == element.faza.idFaze) {
              f++;
            }
          });
          this.stackovi2.forEach(st => {
            if(st.idStacka == element.stack.idStacka) {
              s++;
            }
          });

          if(f == 0) {
            this.faze2.push(element.faza);
            
          }
          if(s == 0) {
            this.stackovi2.push(element.stack);
          }

        }
      });

      this.sortFaze(p => p.idFaze, "ASC");
      
    }

    else if(this.odabraniStack != -1) {
      this.faze2 = [];
      this.imenaFilt = [];

      this.projekti.forEach(element => {
        if(element.stack.idStacka == this.odabraniStack) {
          let b = 0;
          this.faze2.forEach(f => {
            if(f.idFaze == element.faza.idFaze) {
              b++;
            }
          });

          if(b == 0) {
            this.faze2.push(element.faza);
          }

          element.sudionici.forEach(s => {
            if(!this.imenaFilt.includes(s.imePrezime)) {
              this.imenaFilt.push(s.imePrezime);
            }
          });
            
      
        }
      });
    
    }

    else if(this.odabranaFaza != -1) {
      this.stackovi2 = [];
      this.imenaFilt = [];

      this.projekti.forEach(element => {
        if(element.faza.idFaze == this.odabranaFaza) {
          let b = 0;
          this.stackovi2.forEach(f => {
            if(f.idStacka == element.stack.idStacka) {
              b++;
            }
          });

          if(b == 0) {
            this.stackovi2.push(element.stack);
          }

          element.sudionici.forEach(s => {
            if(!this.imenaFilt.includes(s.imePrezime)) {
              this.imenaFilt.push(s.imePrezime);
            }
          });
            
      
        }
      });



    }

    

     
  }

}
