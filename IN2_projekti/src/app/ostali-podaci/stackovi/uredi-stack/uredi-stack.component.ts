import { Component, OnInit } from '@angular/core';
import { TehnoloskiStack } from '../../../models/tehnoloski-stack';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterService } from '../../../router.service';


@Component({
  selector: 'app-uredi-stack',
  templateUrl: './uredi-stack.component.html',
  styleUrls: ['./uredi-stack.component.css']
})
export class UrediStackComponent implements OnInit {

  
  stack: TehnoloskiStack;
  submit: boolean = false;

  constructor(private productService: ProjektiService, private route: ActivatedRoute, private router: Router, private routerService: RouterService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.productService.getStack(id).subscribe(
      products => {
        this.stack = products;
      }
    );
  }

  dodaj() {
    this.submit = true;

    if (this.stack.naziv != '') {


      this.productService.putStack(this.stack).subscribe(res => {
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
