import { Component, OnInit } from '@angular/core';
import { Tehnologija } from '../../../models/tehnologija';
import { ProjektiService } from '../../../projekti/projekti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-uredi-tehnologiju',
  templateUrl: './uredi-tehnologiju.component.html',
  styleUrls: ['./uredi-tehnologiju.component.css']
})
export class UrediTehnologijuComponent implements OnInit {

  tehnologija: Tehnologija;
  submit: boolean = false;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router, private routerService: RouterService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.productService.getTehnologija(id).subscribe(
      products => {
        this.tehnologija = products;
      }
    );
  }

  dodaj() {
    this.submit = true;
    if (this.tehnologija.naziv != '') {


      this.productService.putTehnologija(this.tehnologija).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/tehnologije']);
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
