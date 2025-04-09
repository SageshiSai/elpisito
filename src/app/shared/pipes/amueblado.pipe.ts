import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amueblado'
})
export class AmuebladoPipe implements PipeTransform {

  transform(value: number): string {

    /* if(value == 0 ){
      return "No amueblado";
    }else{
      return "Amueblado";
    } */

    return (value == 0) ? "No amueblado" : "Amueblado"

  }

}
