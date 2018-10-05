import { Component, OnInit } from '@angular/core';
import { Projekt } from '../../models/projekt';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjektiService } from '../projekti.service';
import { Faza } from '../../models/faza';
import { TehnoloskiStack } from '../../models/tehnoloski-stack';
import { RouterService } from '../../router.service';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'projekt-detalji',
  templateUrl: './projekt-detalji.component.html',
  styleUrls: ['./projekt-detalji.component.css']
})
export class ProjektDetaljiComponent implements OnInit {

  projekt: Projekt;
  faze: Faza[];
  stackovi: TehnoloskiStack[];
  url: string;
  closeResult: string;
  modal: NgbModalRef;


  constructor(private route: ActivatedRoute, private router: Router, private productService: ProjektiService, private routerService: RouterService, private modalService: NgbModal) {
    
   }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    
    this.productService.getProjekt(id).subscribe(
      products => {
        this.projekt = products;
        
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/lista-projekata']);
  }

  uredi(): void {
    //this.url = this.routerService.getPreviousUrl();
    let url = "/uredi/" + this.projekt.idProjekta.toString();
    this.router.navigate([url]);
  }
  
  obrisi(): void {
    this.modal.close();
    this.productService.deleteProjekt(this.projekt.idProjekta).subscribe(res => {
      this.router.navigate(['/lista-projekata']);
    }), err => {
      console.log("Error: " + err);

    };
    
    //this.router.navigate(['/lista-projekata']);
    

  }

  open(content) {
    this.modal = this.modalService.open(content, { size: 'sm' });
    console.log(typeof (this.modal) === 'undefined');
  }

  close() {
    this.modal.close();
  }

  
}
