import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"; 
import { Osoba } from "../models/osoba";
@Injectable()
export class OsobaService {

  private productUrl = 'https://localhost:5001/api/osoba';

    constructor(private http: HttpClient) {

    }
    getProducts(): Observable<Osoba[]> {
        return this.http.get<Osoba[]>(this.productUrl).pipe(tap(data => console.log("All " + JSON.stringify(data))));
    }
    

}
