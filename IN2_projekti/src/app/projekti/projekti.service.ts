import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Projekt } from '../models/projekt';
import { tap } from "rxjs/operators"; 
import { Faza } from '../models/faza';
import { TehnoloskiStack } from '../models/tehnoloski-stack';
import { Osoba } from '../models/osoba';
import { Tehnologija } from '../models/tehnologija';
import { PoslovnoPodrucje } from '../models/poslovno-podrucje';
import { Uloga } from '../models/uloga';
import { Dokument } from '../models/dokument';



@Injectable()
export class ProjektiService {

    private projektUrl = 'https://localhost:5001/api/projekt';
    private fazaUrl = 'https://localhost:5001/api/faza';
    private stackUrl = 'https://localhost:5001/api/tehnoloskistack';
    private osobaUrl = 'https://localhost:5001/api/osoba';
    private tehnologijaUrl = 'https://localhost:5001/api/tehnologija';
    private podrucjeUrl = 'https://localhost:5001/api/poslovnopodrucje';
    private ulogaUrl = 'https://localhost:5001/api/uloga';
    private dokumentUrl = 'https://localhost:5001/api/dokument';



    constructor(private http: HttpClient) {

    }
    getProducts(): Observable<Projekt[]> {
        return this.http.get<Projekt[]>(this.projektUrl).pipe(tap(data => console.log()));
    }

    getFaze(): Observable<Faza[]> {
        return this.http.get<Faza[]>(this.fazaUrl).pipe(tap(data => console.log()));
    }

    getStackovi(): Observable<TehnoloskiStack[]> {
        return this.http.get<TehnoloskiStack[]>(this.stackUrl).pipe(tap(data => console.log()));
    }

    getOsobe(): Observable<Osoba[]> {
        return this.http.get<Osoba[]>(this.osobaUrl).pipe(tap(data => console.log()));
    }

    getProjekt(id): Observable<Projekt> {
        return this.http.get<Projekt>(this.projektUrl + "/" + id).pipe(tap(data => console.log()));
    }   

    getTehnologije(): Observable<Tehnologija[]> {
        return this.http.get<Tehnologija[]>(this.tehnologijaUrl).pipe(tap(data => console.log()));
    }

    getPodrucje(): Observable<PoslovnoPodrucje[]> {
        return this.http.get<PoslovnoPodrucje[]>(this.podrucjeUrl).pipe(tap(data => console.log()));
    }

    getUloge(): Observable<Uloga[]> {
        return this.http.get<Uloga[]>(this.ulogaUrl).pipe(tap(data => console.log()));
    }
   

    postProjekt(projekt: Projekt): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<Projekt>(this.projektUrl, body, {headers});
    } 

    putProjekt(projekt: Projekt): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<Projekt>(this.projektUrl + "/" + projekt.idProjekta.toString(), body, {headers});
    } 

    deleteProjekt(id): Observable<Projekt> {
        return this.http.delete<Projekt>(this.projektUrl + "/" + id);
    } 

    postDokument(projekt: Dokument): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<Dokument>(this.dokumentUrl, body, {headers});
    } 

    deleteDokument(id): Observable<Dokument> {
        console.log("DELETE " + id);
        return this.http.delete<Dokument>(this.dokumentUrl + "/" + id);
    } 

    postOsoba(projekt: Osoba): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<Osoba>(this.osobaUrl, body, {headers});
    } 

    getOsoba(id): Observable<Osoba> {
        return this.http.get<Osoba>(this.osobaUrl + "/" + id).pipe(tap(data => console.log()));
    }  

    putOsoba(projekt: Osoba): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<Osoba>(this.osobaUrl + "/" + projekt.idOsobe.toString(), body, {headers});
    } 

    deleteOsoba(id): Observable<Osoba> {
        return this.http.delete<Osoba>(this.osobaUrl + "/" + id);
    } 

    getTehnologija(id): Observable<Tehnologija> {
        return this.http.get<Tehnologija>(this.tehnologijaUrl + "/" + id).pipe(tap(data => console.log()));
    }  

    putTehnologija(projekt: Tehnologija): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<Tehnologija>(this.tehnologijaUrl + "/" + projekt.idTehnologije.toString(), body, {headers});
    } 

    deleteTehnologija(id): Observable<Tehnologija> {
        return this.http.delete<Tehnologija>(this.tehnologijaUrl + "/" + id);
    } 

    postTehnologija(projekt: Tehnologija): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<Tehnologija>(this.tehnologijaUrl, body, {headers});
    } 
    getPodrucje1(id): Observable<PoslovnoPodrucje> {
        return this.http.get<PoslovnoPodrucje>(this.podrucjeUrl + "/" + id).pipe(tap(data => console.log()));
    }  

    putPodrucje(projekt: PoslovnoPodrucje): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<PoslovnoPodrucje>(this.podrucjeUrl + "/" + projekt.idPodrucja.toString(), body, {headers});
    } 

    deletePodrucje(id): Observable<PoslovnoPodrucje> {
        return this.http.delete<PoslovnoPodrucje>(this.podrucjeUrl + "/" + id);
    } 

    postPodrucje(projekt: PoslovnoPodrucje): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<PoslovnoPodrucje>(this.podrucjeUrl, body, {headers});
    } 

    getStack(id): Observable<TehnoloskiStack> {
        return this.http.get<TehnoloskiStack>(this.stackUrl + "/" + id).pipe(tap(data => console.log()));
    }  

    putStack(projekt: TehnoloskiStack): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<TehnoloskiStack>(this.stackUrl + "/" + projekt.idStacka.toString(), body, {headers});
    } 

    deleteStack(id): Observable<TehnoloskiStack> {
        return this.http.delete<TehnoloskiStack>(this.stackUrl + "/" + id);
    } 

    postStack(projekt: TehnoloskiStack): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<TehnoloskiStack>(this.stackUrl, body, {headers});
    } 
    getFaza(id): Observable<Faza> {
        return this.http.get<Faza>(this.fazaUrl + "/" + id).pipe(tap(data => console.log()));
    }  

    putFaza(projekt: Faza): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<Faza>(this.fazaUrl + "/" + projekt.idFaze.toString(), body, {headers});
    } 

    deleteFaza(id): Observable<Faza> {
        return this.http.delete<Faza>(this.fazaUrl + "/" + id);
    } 

    postFaza(projekt: Faza): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<Faza>(this.fazaUrl, body, {headers});
    } 
    getUloga(id): Observable<Uloga> {
        return this.http.get<Uloga>(this.ulogaUrl + "/" + id).pipe(tap(data => console.log()));
    }  

    putUloga(projekt: Uloga): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.put<Uloga>(this.ulogaUrl + "/" + projekt.idUloge.toString(), body, {headers});
    } 

    deleteUloga(id): Observable<Uloga> {
        return this.http.delete<Uloga>(this.ulogaUrl + "/" + id);
    } 

    postUloga(projekt: Uloga): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json'); 
        let body = JSON.stringify(projekt);
        return this.http.post<Uloga>(this.ulogaUrl, body, {headers});
    } 

   
}
