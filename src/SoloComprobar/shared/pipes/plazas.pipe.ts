import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plazas'
})
export class PlazasPipe implements PipeTransform {

  transform(value: string): string {
    if(value == "1"){
      return `${value} plaza`
    }else{
      return `${value} plazas`
    }
  }

}
