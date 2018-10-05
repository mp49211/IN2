import { Component, OnInit } from '@angular/core';
import { Osoba } from '../../../models/osoba';
import { ProjektiService } from '../../../projekti/projekti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'uredi-osobu',
  templateUrl: './uredi-osobu.component.html',
  styleUrls: ['./uredi-osobu.component.css']
})
export class UrediOsobuComponent implements OnInit {
  osoba: Osoba;
  submit: boolean = false;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router, private routerService: RouterService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.productService.getOsoba(id).subscribe(
      products => {
        this.osoba = products;
      }
    );
  }

  ngDoCheck() {
    
  }

  dodaj() {
    this.submit = true;
    if (this.osoba.ime != '' && this.osoba.prezime != '' && this.osoba.oib != '') {
      this.osoba.imePrezime = this.osoba.ime + " " + this.osoba.prezime;


      this.productService.putOsoba(this.osoba).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/osoba']);
      }), err => {
        console.log("Error: " + err);

      };
    } 
    //this.submit = false;
  }
  odustani(): void {
    let url = this.routerService.getPreviousUrl();
    this.router.navigate([url]);
  }

}
