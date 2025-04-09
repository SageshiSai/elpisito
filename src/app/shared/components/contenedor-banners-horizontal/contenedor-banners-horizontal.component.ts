import { Component, Input } from '@angular/core';
import { BannerHorizontal } from '../../../core/models/entities';
import { BannerHorizontalComponent } from "../banner-horizontal/banner-horizontal.component";

@Component({
  selector: 'app-contenedor-banners-horizontal',
  imports: [BannerHorizontalComponent],
  templateUrl: './contenedor-banners-horizontal.component.html',
  styleUrl: './contenedor-banners-horizontal.component.css'
})
export class ContenedorBannersHorizontalComponent {

  @Input() banners:Array<BannerHorizontal>;

}
