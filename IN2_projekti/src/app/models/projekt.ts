import { Faza } from "./faza";
import { TehnoloskiStack } from "./tehnoloski-stack";

import { Dokument } from "./dokument";
import { PoslovnoPodrucje } from "./poslovno-podrucje";
import { Tehnologija } from "./tehnologija";
import { Sudionik } from "./sudionik";


export class Projekt {
  
    public idProjekta: number;
    public naziv: string;
    public opis?: string;
    public kljucneRijeci?: string;
    
    public datumPocetka?: Date;
    public datumZavrsetka?: Date;
 
    public faza: Faza;
    public stack: TehnoloskiStack;
    public dokumenti: Dokument[];
    public sudionici: Sudionik[];
    public podrucja: PoslovnoPodrucje[];
    public tehnologije: Tehnologija[];
}