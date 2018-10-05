import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  constructor( private router: Router) {
    
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  zaposlenici() {
    this.router.navigate(['/osoba']);
  }
  tehnologije() {
    this.router.navigate(['/tehnologije']);
  }
  podrucja() {
    this.router.navigate(['/podrucja']);
  }

  stackovi() {
    this.router.navigate(['/stackovi']);
  }
  faze() {
    this.router.navigate(['/faze']);
  }
  uloge() {
    this.router.navigate(['/uloge']);
  }
  noviProjekt() {
    this.router.navigate(['/novi-projekt']);
  }
}
