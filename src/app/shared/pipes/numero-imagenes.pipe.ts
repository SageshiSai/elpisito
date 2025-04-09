import { Pipe, PipeTransform } from '@angular/core';
import { Imagen } from '../../core/models/entities';

@Pipe({
  name: 'numeroImagenes'
})
export class NumeroImagenesPipe implements PipeTransform {

  transform(value: Array<Imagen>): number {
    return value.length;
  }


}
