import { Component, OnInit } from '@angular/core';
import { Faza } from '../../../models/faza';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { RouterService } from '../../../router.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-nova-faza',
  templateUrl: './nova-faza.component.html',
  styleUrls: ['./nova-faza.component.css']
})
export class NovaFazaComponent implements OnInit {

  
  public faza: Faza = new Faza();
  //form: FormGroup;
  public submit: boolean = false;

  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {
    this.faza.naziv = '';
    
  }

  dodaj() {
    this.submit = true;
    if (this.faza.naziv != '') {


      this.productService.postFaza(this.faza).subscribe(res => {
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
