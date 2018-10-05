import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjektiListaComponent } from './projekti/projekti-lista/projekti-lista.component';
import { OsobaService } from './osobe/osoba.service';
import { HttpModule } from '@angular/http';
import { ProjektiService } from './projekti/projekti.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgAutoCompleteModule} from "ng-auto-complete";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BootstrapAutocompleteModule} from 'angular-bootstrap-autocomplete';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { AngularFileUploaderModule } from "angular-file-uploader";




import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';

import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { ProjektDetaljiComponent } from './projekti/projekt-detalji/projekt-detalji.component';
import { ProjektDetaljiGuard } from './projekti/projekt-detalji/projekt-detalji.guard';
import { ListaProjekataComponent } from './projekti/lista-projekata/lista-projekata.component';
import { NoviProjektComponent } from './projekti/novi-projekt/novi-projekt.component';
import { RouterService } from './router.service';
import { UrediProjektComponent } from './projekti/uredi-projekt/uredi-projekt.component';
import { UrediProjektGuard } from './projekti/uredi-projekt/uredi-projekt.guard';
import { UpravljanjePodacimaComponent } from './ostali-podaci/upravljanje-podacima/upravljanje-podacima.component';
import { OsobeComponent } from './ostali-podaci/osobe/osobe/osobe.component';
import { NovaOsobaComponent } from './ostali-podaci/osobe/nova-osoba/nova-osoba.component';
import { OsobePipe } from './ostali-podaci/osobe/osobe.pipe';
import { UrediOsobuComponent } from './ostali-podaci/osobe/uredi-osobu/uredi-osobu.component';
import { TehnologijeComponent } from './ostali-podaci/tehnologije/tehnologije/tehnologije.component';
import { NovaTehnologijaComponent } from './ostali-podaci/tehnologije/nova-tehnologija/nova-tehnologija.component';
import { UrediTehnologijuComponent } from './ostali-podaci/tehnologije/uredi-tehnologiju/uredi-tehnologiju.component';
import { PodrucjaComponent } from './ostali-podaci/podrucja/podrucja/podrucja.component';
import { NovoPodrucjeComponent } from './ostali-podaci/podrucja/novo-podrucje/novo-podrucje.component';
import { UrediPodrucjeComponent } from './ostali-podaci/podrucja/uredi-podrucje/uredi-podrucje.component';
import { StackoviComponent } from './ostali-podaci/stackovi/stackovi/stackovi.component';
import { NoviStackComponent } from './ostali-podaci/stackovi/novi-stack/novi-stack.component';
import { UrediStackComponent } from './ostali-podaci/stackovi/uredi-stack/uredi-stack.component';
import { FazeComponent } from './ostali-podaci/faze/faze/faze.component';
import { NovaFazaComponent } from './ostali-podaci/faze/nova-faza/nova-faza.component';
import { UrediFazuComponent } from './ostali-podaci/faze/uredi-fazu/uredi-fazu.component';
import { UlogeComponent } from './ostali-podaci/uloge/uloge/uloge.component';
import { NovaUlogaComponent } from './ostali-podaci/uloge/nova-uloga/nova-uloga.component';
import { UrediUloguComponent } from './ostali-podaci/uloge/uredi-ulogu/uredi-ulogu.component';
// import { UrediProjektComponent } from './projekti/uredi-projekt/uredi-projekt.component';
// import { UrediProjektGuard } from './projekti/uredi-projekt/uredi-projekt.guard';

keyboardEventKeyPolyfill();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProjektiListaComponent,
    OsobeComponent,
    ProjektDetaljiComponent,
    ListaProjekataComponent,
    NoviProjektComponent,
    UrediProjektComponent,
    NovaOsobaComponent,
    UpravljanjePodacimaComponent,
    OsobePipe,
    UrediOsobuComponent,
    TehnologijeComponent,
    NovaTehnologijaComponent,
    UrediTehnologijuComponent,
    PodrucjaComponent,
    NovoPodrucjeComponent,
    UrediPodrucjeComponent,
    StackoviComponent,
    NoviStackComponent,
    UrediStackComponent,
    FazeComponent,
    NovaFazaComponent,
    UrediFazuComponent,
    UlogeComponent,
    NovaUlogaComponent,
    UrediUloguComponent,
    // UrediProjektComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    TextInputAutocompleteModule,
    NgbModule,
    NgxTypeaheadModule,
    AngularFileUploaderModule,
    BootstrapAutocompleteModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    MatAutocompleteModule,
    BootstrapAutocompleteModule,
    NgAutoCompleteModule,
    HttpModule,
    //TypeaheadModule.forRoot(),
    //NbgTypeaheadModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'projekti-lista', component: ProjektiListaComponent },
      { path: 'osoba', component: OsobeComponent },
      { path: 'nova-osoba', component: NovaOsobaComponent },
      { path: 'tehnologije', component: TehnologijeComponent },
      { path: 'nova-tehnologija', component: NovaTehnologijaComponent },
      { path: 'uredi-osobu/:id', component: UrediOsobuComponent },
      { path: 'faze', component: FazeComponent },
      { path: 'nova-faza', component: NovaFazaComponent },
      { path: 'uredi-fazu/:id', component: UrediFazuComponent },
      { path: 'uloge', component: UlogeComponent },
      { path: 'nova-uloga', component: NovaUlogaComponent },
      { path: 'uredi-ulogu/:id', component: UrediUloguComponent },
      { path: 'podrucja', component: PodrucjaComponent },
      { path: 'novo-podrucje', component: NovoPodrucjeComponent },
      { path: 'uredi-podrucje/:id', component: UrediPodrucjeComponent },
      { path: 'stackovi', component: StackoviComponent },
      { path: 'novi-stack', component: NoviStackComponent },
      { path: 'uredi-stack/:id', component: UrediStackComponent },
      { path: 'uredi-tehnologiju/:id', component: UrediTehnologijuComponent },
      { path: 'lista-projekata', component: ListaProjekataComponent },
      { path: 'novi-projekt', component: NoviProjektComponent },
      { path: 'projekt/:id',
      canActivate: [ ProjektDetaljiGuard ], 
      component: ProjektDetaljiComponent },
      { path: 'uredi/:id',
      canActivate: [ UrediProjektGuard ], 
      component: UrediProjektComponent },
    ])
  ],
  providers: [OsobaService, ProjektiService, RouterService, UrediProjektGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
