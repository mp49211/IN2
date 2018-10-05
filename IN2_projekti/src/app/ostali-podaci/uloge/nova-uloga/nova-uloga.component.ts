import { Component, OnInit } from '@angular/core';
import { Uloga } from '../../../models/uloga';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-nova-uloga',
  templateUrl: './nova-uloga.component.html',
  styleUrls: ['./nova-uloga.component.css']
})
export class NovaUlogaComponent implements OnInit {

  public uloga: Uloga = new Uloga();

  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {
  }

  dodaj() {
    if (this.uloga.naziv != null) {


      this.productService.postUloga(this.uloga).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/uloge']);
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
