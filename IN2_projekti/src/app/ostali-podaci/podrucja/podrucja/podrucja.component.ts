import { Component, OnInit } from '@angular/core';
import { PoslovnoPodrucje } from '../../../models/poslovno-podrucje';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { Tehnologija } from '../../../models/tehnologija';

@Component({
  selector: 'app-podrucja',
  templateUrl: './podrucja.component.html',
  styleUrls: ['./podrucja.component.css']
})
export class PodrucjaComponent implements OnInit {

  public podrucja: PoslovnoPodrucje[];
  productSortOrder: boolean;
  modal: NgbModalRef;
  closeResult: string;
  public idObrisi: number;

  constructor(private productService: ProjektiService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit() {

    this.productService.getPodrucje().subscribe(
      products => {
        this.podrucja = products;

      }
    );

  }

  ngDoCheck() {
    this.sort(p => p.naziv, "ASC");

  }

  novi() {
    this.router.navigate(['/novo-podrucje']);
  }

  obrisi(): void {
    this.modal.close();
    for (let i = 0; i < this.podrucja.length; i++) {
      if (this.podrucja[i].idPodrucja == this.idObrisi) {
        this.podrucja.splice(i, 1);
      }
    }
    
    this.productService.deletePodrucje(this.idObrisi).subscribe(res => {
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


  sort<T>(prop: (c: PoslovnoPodrucje) => T, order: "ASC" | "DESC"): void {
    this.podrucja.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.podrucja.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }
}
