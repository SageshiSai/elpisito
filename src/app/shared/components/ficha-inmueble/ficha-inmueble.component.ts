import { Component, Input } from '@angular/core';
import { CarouselFichaComponent } from '../carousel-ficha/carousel-ficha.component';
import { Inmueble } from '../../../core/models/entities';
import { GLOBAL } from '../../../core/environments/global';
import { EurosPipe } from "../../pipes/euros.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ficha-inmueble',
  imports: [CarouselFichaComponent, EurosPipe, RouterLink],
  templateUrl: './ficha-inmueble.component.html',
  styleUrl: './ficha-inmueble.component.css'
})
export class FichaInmuebleComponent {

  @Input() datos:Inmueble; //Cuando lleguen los datos por parte del parent estarán incluídos todos los datos del inmueble (incluídas las imágenes)

  url:string = GLOBAL.url_imagen_logo_inmobiliaria;


}
