import { Component, OnInit } from '@angular/core';
import { Tehnologija } from '../../../models/tehnologija';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { TehnoloskiStack } from '../../../models/tehnoloski-stack';

@Component({
  selector: 'app-stackovi',
  templateUrl: './stackovi.component.html',
  styleUrls: ['./stackovi.component.css']
})
export class StackoviComponent implements OnInit {
  public stackovi: TehnoloskiStack[];
  productSortOrder: boolean;
  modal: NgbModalRef;
  closeResult: string;
  public idObrisi: number;

  constructor(private productService: ProjektiService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit() {

    this.productService.getStackovi().subscribe(
      products => {
        this.stackovi = products;

      }
    );

  }

  ngDoCheck() {
    this.sort(p => p.naziv, "ASC");

  }

  novi() {
    this.router.navigate(['/novi-stack']);
  }

  obrisi(): void {
    this.modal.close();
    for (let i = 0; i < this.stackovi.length; i++) {
      if (this.stackovi[i].idStacka == this.idObrisi) {
        this.stackovi.splice(i, 1);
      }
    }
    
    this.productService.deleteStack(this.idObrisi).subscribe(res => {
      //window.location.reload();
    }), err => {
      console.log("Error: " + err);

    };
    //this.router.navigate(['/lista-projekata']);


  }

  open(content, id) {
    this.modal = this.modalService.open(content, { size: 'sm' });
    this.idObrisi = id;
  }

  close() {
    this.modal.close();
  }


  sort<T>(prop: (c: TehnoloskiStack) => T, order: "ASC" | "DESC"): void {
    this.stackovi.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.stackovi.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }

}
