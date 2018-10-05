import { Component, OnInit } from '@angular/core';
import { ProjektiService } from '../../../projekti/projekti.service';
import { Osoba } from '../../../models/osoba';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Location } from '@angular/common';


@Component({
  selector: 'osoba',
  templateUrl: './osobe.component.html',
  styleUrls: ['./osobe.component.css'],
  providers: [ProjektiService]
})
export class OsobeComponent implements OnInit {
  public osobe: Osoba[];
  public search: string = "";
  productSortOrder: boolean;
  modal: NgbModalRef;
  closeResult: string;
  public idObrisi: number;



  // constructor(private productService: OsobaService)  {}

  constructor(private productService: ProjektiService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit() {

    this.productService.getOsobe().subscribe(
      products => {
        this.osobe = products;

      }
    );

  }

  ngDoCheck() {
    this.sort(p => p.imePrezime.toLowerCase, "ASC");

  }

  novi() {
    this.router.navigate(['/nova-osoba']);
  }

  obrisi(): void {
    this.modal.close();
    for (let i = 0; i < this.osobe.length; i++) {
      if (this.osobe[i].idOsobe == this.idObrisi) {
        this.osobe.splice(i, 1);
      }
    }
    
    this.productService.deleteOsoba(this.idObrisi).subscribe(res => {
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


  sort<T>(prop: (c: Osoba) => T, order: "ASC" | "DESC"): void {
    this.osobe.sort((a, b) => {
      if (prop(a) < prop(b))
        return -1;
      if (prop(a) > prop(b))
        return 1;
      return 0;
    });

    if (order === "DESC") {
      this.osobe.reverse();
      this.productSortOrder = true;
    } else {
      this.productSortOrder = false;
    }
  }

}
