import { Component, OnInit } from '@angular/core';
import { Osoba } from '../../../models/osoba';
import { ProjektiService } from '../../../projekti/projekti.service';
import { RouterService } from '../../../router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nova-osoba',
  templateUrl: './nova-osoba.component.html',
  styleUrls: ['./nova-osoba.component.css']
})
export class NovaOsobaComponent implements OnInit {

  public osoba: Osoba = new Osoba();
  submit: boolean = false;

  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {
    this.osoba.ime = '';
    this.osoba.prezime = '';
    this.osoba.oib = '';
  }

  dodaj() {
    this.submit = true;
    if (this.osoba.ime != '' && this.osoba.prezime != '' && this.osoba.oib != '') {
      this.osoba.imePrezime = this.osoba.ime + " " + this.osoba.prezime;


      this.productService.postOsoba(this.osoba).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/osoba']);
      }), err => {
        console.log("Error: " + err);

      };


    } 
  }

  odustani(): void {
    let url = this.routerService.getPreviousUrl();
    this.router.navigate([url]);
  }


}
