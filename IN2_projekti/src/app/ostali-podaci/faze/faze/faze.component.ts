import { Component, OnInit } from '@angular/core';
import { Tehnologija } from '../../../models/tehnologija';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { Faza } from '../../../models/faza';

@Component({
  selector: 'app-faze',
  templateUrl: './faze.component.html',
  styleUrls: ['./faze.component.css']
})
export class FazeComponent implements OnInit {
  public faze: Faza[];
  productSortOrder: boolean;
  modal: NgbModalRef;
  closeResult: string;
  public idObrisi: number;

  constructor(private productService: ProjektiService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit() {

    this.productService.getFaze().subscribe(
      products => {
        this.faze = products;

      }
    );

  }

  ngDoCheck() {
    this.sort(p => p.naziv, "ASC");

  }

  novi() {
    this.router.navigate(['/nova-faza']);
  }

  obrisi(): void {
    this.modal.close();
    for (let i = 0; i < this.faze.length; i++) {
      if (this.faze[i].idFaze == this.idObrisi) {
        this.faze.splice(i, 1);
      }
    }
    
    this.productService.deleteFaza(this.idObrisi).subscribe(res => {
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


  sort<T>(prop: (c: Faza) => T, order: "ASC" | "DESC"): void {
    this.faze.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.faze.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }
}
