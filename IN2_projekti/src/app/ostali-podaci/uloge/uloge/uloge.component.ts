import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { Uloga } from '../../../models/uloga';

@Component({
  selector: 'app-uloge',
  templateUrl: './uloge.component.html',
  styleUrls: ['./uloge.component.css']
})
export class UlogeComponent implements OnInit {

  public uloge: Uloga[];
  productSortOrder: boolean;
  modal: NgbModalRef;
  closeResult: string;
  public idObrisi: number;

  constructor(private productService: ProjektiService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit() {

    this.productService.getUloge().subscribe(
      products => {
        this.uloge = products;

      }
    );

  }

  ngDoCheck() {
    this.sort(p => p.naziv, "ASC");

  }

  novi() {
    this.router.navigate(['/nova-uloga']);
  }

  obrisi(): void {
    this.modal.close();
    for (let i = 0; i < this.uloge.length; i++) {
      if (this.uloge[i].idUloge == this.idObrisi) {
        this.uloge.splice(i, 1);
      }
    }
    
    this.productService.deleteUloga(this.idObrisi).subscribe(res => {
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


  sort<T>(prop: (c: Uloga) => T, order: "ASC" | "DESC"): void {
    this.uloge.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.uloge.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }

}
