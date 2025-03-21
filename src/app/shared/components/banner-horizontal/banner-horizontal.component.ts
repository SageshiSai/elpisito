import { Component, Input } from '@angular/core';
import { BannerHorizontal } from '../../../core/models/utils';

@Component({
  selector: 'app-banner-horizontal',
  imports: [],
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
