import { Component, OnInit } from '@angular/core';
import { Tehnologija } from '../../../models/tehnologija';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { RouterService } from '../../../router.service';


@Component({
  selector: 'app-nova-tehnologija',
  templateUrl: './nova-tehnologija.component.html',
  styleUrls: ['./nova-tehnologija.component.css']
})
export class NovaTehnologijaComponent implements OnInit {

  public tehnologija: Tehnologija = new Tehnologija();
  public submit: boolean = false;

  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {
    this.tehnologija.naziv = ''
  }


  dodaj() {
    this.submit = true;
    if (this.tehnologija.naziv != '') {


      this.productService.postTehnologija(this.tehnologija).subscribe(res => {
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
