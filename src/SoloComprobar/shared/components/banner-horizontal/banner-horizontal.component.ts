import { Component, inject, Input } from '@angular/core';
import { BannerHorizontal } from '../../../core/models/entities';
import { NoImagenBannerDirective } from '../../directives/no-imagen-banner.directive';
import { GLOBAL } from '../../../core/environments/global';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner-horizontal',
  imports: [NoImagenBannerDirective,RouterLink],
  templateUrl: './banner-horizontal.component.html',
  styleUrl: './banner-horizontal.component.css'
})
export class BannerHorizontalComponent {

  private _router:Router = inject(Router);

  @Input() datos:BannerHorizontal;
  url:string=GLOBAL.url_imagen_banner;





}
