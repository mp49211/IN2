import { Component, OnInit } from '@angular/core';
import { PoslovnoPodrucje } from '../../../models/poslovno-podrucje';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-uredi-podrucje',
  templateUrl: './uredi-podrucje.component.html',
  styleUrls: ['./uredi-podrucje.component.css']
})
export class UrediPodrucjeComponent implements OnInit {

  podrucje: PoslovnoPodrucje;
  submit: boolean = false;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router, private routerService: RouterService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.productService.getPodrucje1(id).subscribe(
      products => {
        this.podrucje = products;
      }
    );
  }

  dodaj() {
    this.submit = true;
    if (this.podrucje.naziv != '') {


      this.productService.putPodrucje(this.podrucje).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/podrucja']);
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
