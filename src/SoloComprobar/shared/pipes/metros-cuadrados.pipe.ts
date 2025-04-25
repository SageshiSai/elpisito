import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metrosCuadrados'
})
export class MetrosCuadradosPipe implements PipeTransform {

  transform(value: number): string {
    return `${value} m2`;
  }

}
