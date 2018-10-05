import { Component, OnInit } from '@angular/core';
import { ProjektiService } from '../../../projekti/projekti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from '../../../router.service';
import { Uloga } from '../../../models/uloga';

@Component({
  selector: 'app-uredi-ulogu',
  templateUrl: './uredi-ulogu.component.html',
  styleUrls: ['./uredi-ulogu.component.css']
})
export class UrediUloguComponent implements OnInit {

  uloga: Uloga;
  submit: boolean = false;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router, private routerService: RouterService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.productService.getUloga(id).subscribe(
      products => {
        this.uloga = products;
      }
    );
  }

  dodaj() {
    this.submit = true;
    if (this.uloga.naziv != '') {
      this.productService.putUloga(this.uloga).subscribe(res => {
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
