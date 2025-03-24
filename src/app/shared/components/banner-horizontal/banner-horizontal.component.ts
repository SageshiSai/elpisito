import { Component, Input } from '@angular/core';
import { BannerHorizontal } from '../../../core/models/entities';
import { NoImagenDirective } from '../../directives/no-imagen.directive';

@Component({
  selector: 'app-banner-horizontal',
  imports: [NoImagenDirective],
  templateUrl: './banner-horizontal.component.html',
  styleUrl: './banner-horizontal.component.css'
})
export class BannerHorizontalComponent {

  // @Input() altImagen:String;
  // @Input() imagen:String;
  // @Input() titular:String;
  // @Input() claim:String;
  // @Input() link:String;
  // @Input() textoLink:String;

  @Input() datos: BannerHorizontal;

}
