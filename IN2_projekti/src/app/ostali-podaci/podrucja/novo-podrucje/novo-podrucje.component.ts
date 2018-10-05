import { Component, OnInit } from '@angular/core';
import { PoslovnoPodrucje } from '../../../models/poslovno-podrucje';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-novo-podrucje',
  templateUrl: './novo-podrucje.component.html',
  styleUrls: ['./novo-podrucje.component.css']
})
export class NovoPodrucjeComponent implements OnInit {

  public podrucje: PoslovnoPodrucje = new PoslovnoPodrucje();
  submit: boolean = false;

  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {
    this.podrucje.naziv = '';
  }

  dodaj() {
    this.submit = true;

    if (this.podrucje.naziv != '') {


      this.productService.postPodrucje(this.podrucje).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/podrucja']);
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
}
