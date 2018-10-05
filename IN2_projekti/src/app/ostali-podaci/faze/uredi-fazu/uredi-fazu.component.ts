import { Component, OnInit } from '@angular/core';
import { Faza } from '../../../models/faza';
import { ProjektiService } from '../../../projekti/projekti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from '../../../router.service';
import { FactoryOrValue } from 'rxjs';

@Component({
  selector: 'app-uredi-fazu',
  templateUrl: './uredi-fazu.component.html',
  styleUrls: ['./uredi-fazu.component.css']
})
export class UrediFazuComponent implements OnInit {

  faza: Faza;
  submit: boolean = false;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router, private routerService: RouterService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.productService.getFaza(id).subscribe(
      products => {
        this.faza = products;
      }
    );
  }

  dodaj() {
    this.submit = true;
    if (this.faza.naziv != '') {
      this.productService.putFaza(this.faza).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/faze']);
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
