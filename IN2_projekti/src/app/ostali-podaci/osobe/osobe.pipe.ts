import { Pipe, PipeTransform } from '@angular/core';
import { Osoba } from '../../models/osoba';

@Pipe({
  name: 'osobe'
})
export class OsobePipe implements PipeTransform {

  transform(items: Osoba[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.imePrezime.toLowerCase().includes(searchText);
    });
  }

}
