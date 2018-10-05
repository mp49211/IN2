import { Component, OnInit } from '@angular/core';
import { TehnoloskiStack } from '../../../models/tehnoloski-stack';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { RouterService } from '../../../router.service';


@Component({
  selector: 'app-novi-stack',
  templateUrl: './novi-stack.component.html',
  styleUrls: ['./novi-stack.component.css']
})
export class NoviStackComponent implements OnInit {
  public stack: TehnoloskiStack = new TehnoloskiStack();
  submit: boolean = false;

  constructor(private productService: ProjektiService, private routerService: RouterService, private router: Router) { }

  ngOnInit() {
    this.stack.naziv = ''
  }

  dodaj() {
    this.submit = true;
    if (this.stack.naziv != '') {


      this.productService.postStack(this.stack).subscribe(res => {
        let url = this.routerService.getPreviousUrl();
        this.router.navigate(['/stackovi']);
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
