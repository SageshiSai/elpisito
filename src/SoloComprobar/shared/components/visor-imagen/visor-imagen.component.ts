import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-visor-imagen',
  imports: [MatIconModule],
  templateUrl: './visor-imagen.component.html',
  styleUrl: './visor-imagen.component.css'
})
export class VisorImagenComponent {

  imagenActual:string;
  imagenes: Array<string>;
  indexActual:number;


  constructor(

    public dialogRef:MatDialogRef<VisorImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ imagenes: Array<string>, index:number}

  ){
    this.imagenes = data.imagenes;
    this.indexActual = data.index;
    this.imagenActual = this.imagenes[this.indexActual];

  }


  cambiarImagen(dir:number):void{

    /* console.log("sumatorio:" + dir);
    console.log("index de la imagen actual:" + this.indexActual);
    console.log("numero de imágenes:" + this.imagenes.length); */
   /*  Utilizamos el operador % para que cuando estemos en la última imagen devuelva 0 
    logrando que volvamos a empezar el ciclo desde la primera imagen (indice 0) */


    this.indexActual = (this.indexActual + dir + this.imagenes.length) % this.imagenes.length;
    this.imagenActual = this.imagenes[this.indexActual];


    
    /* console.log("url imagen actual:" + this.imagenActual); */


  }

}
