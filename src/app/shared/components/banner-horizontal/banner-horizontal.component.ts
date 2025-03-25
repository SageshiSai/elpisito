import { Component, Input } from '@angular/core';
import { BannerHorizontal } from '../../../core/models/entities';
import { NoImagenDirective } from '../../directives/no-imagen.directive';
import { NoImagenBannerDirective } from '../../directives/no-imagen-banner.directive';
import { GLOBAL } from '../../../core/environments/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-horizontal',
  imports: [NoImagenBannerDirective, CommonModule],
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

  url:String = GLOBAL.url_imagen_banner;


}
