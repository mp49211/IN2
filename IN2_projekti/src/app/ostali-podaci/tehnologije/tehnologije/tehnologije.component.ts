import { Component, OnInit } from '@angular/core';
import { Tehnologija } from '../../../models/tehnologija';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Router } from '@angular/router';
import { Osoba } from '../../../models/osoba';

@Component({
  selector: 'tehnologije',
  templateUrl: './tehnologije.component.html',
  styleUrls: ['./tehnologije.component.css']
})
export class TehnologijeComponent implements OnInit {
  public tehnologije: Tehnologija[];
  productSortOrder: boolean;
  modal: NgbModalRef;
  closeResult: string;
  public idObrisi: number;

  constructor(private productService: ProjektiService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit() {

    this.productService.getTehnologije().subscribe(
      products => {
        this.tehnologije = products;

      }
    );

  }

  ngDoCheck() {
    this.sort(p => p.naziv, "ASC");

  }

  novi() {
    this.router.navigate(['/nova-tehnologija']);
  }

  obrisi(): void {
    this.modal.close();
    for (let i = 0; i < this.tehnologije.length; i++) {
      if (this.tehnologije[i].idTehnologije == this.idObrisi) {
        this.tehnologije.splice(i, 1);
      }
    }
    
    this.productService.deleteTehnologija(this.idObrisi).subscribe(res => {
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


  sort<T>(prop: (c: Tehnologija) => T, order: "ASC" | "DESC"): void {
    this.tehnologije.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.tehnologije.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }

}
