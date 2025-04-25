import { Component, inject, OnInit } from '@angular/core';
import { NoImagenCarouselDirective } from '../../../shared/directives/no-imagen-carousel.directive';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { BannerService } from '../../../core/services/banner.service';
import { BannerCarousel } from '../../../core/models/entities';
import { GLOBAL } from '../../../core/environments/global';

@Component({
  selector: 'app-list-banner-carousel',
  imports: [PreloaderComponent,NgClass,RouterLink,NoImagenCarouselDirective],
  templateUrl: './list-banner-carousel.component.html',
  styleUrl: './list-banner-carousel.component.css'
})
export class ListBannerCarouselComponent  implements OnInit {



  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _bannerService:BannerService = inject(BannerService);
  private _router:Router = inject(Router);

  aDatos:Array<BannerCarousel>= [];

  url:string = GLOBAL.url_imagen_carousel;
  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._bannerService.getBannersCarousel().subscribe({

      next: (datos) => {this.aDatos = datos}
      ,
      error: (error) => { this._router.navigate(['/error'])}
      ,
      complete: () => { this.faseCarga()}
    });



  }

    ///////////////////////////////////////////////////////
    faseCarga():void{

      this.fasesCargadas++;

      if(this.fasesCargadas == this.nFases){

        this.cargaCompletada = true;
      }
    }
    //////////////////////////////////////////////////////

}
