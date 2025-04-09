import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL } from '../../../core/environments/global';
import { Imagen, Inmueble } from '../../../core/models/entities';
import { NgClass } from '@angular/common';
import { NumeroImagenesPipe } from "../../pipes/numero-imagenes.pipe";

@Component({
  selector: 'app-carousel-ficha',
  imports: [NgClass, NumeroImagenesPipe],
  templateUrl: './carousel-ficha.component.html',
  styleUrl: './carousel-ficha.component.css'
})
export class CarouselFichaComponent implements OnInit {


  @Input() datosInmueble:Inmueble; //Aquí están todos los datos del inmueble
  url:string = GLOBAL.url_imagen; //http://localhost:8080/media/file/
  imagenesActivas:Array<Imagen> = [];

  ngOnInit(): void {

    this.imagenesActivas  =  this.datosInmueble.imagenes.filter( img => img.activo === 1 );

    console.log(this.imagenesActivas);

  }




}
