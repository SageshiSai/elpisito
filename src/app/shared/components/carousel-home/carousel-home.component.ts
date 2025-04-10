import { Component, inject, OnInit } from '@angular/core';
import { BannerService } from '../../../core/services/banner.service';
import { BannerCarousel } from '../../../core/models/entities';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { GLOBAL } from '../../../core/environments/global';

@Component({
  selector: 'app-carousel-home',
  imports: [NgClass],
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.css'
})
export class CarouselHomeComponent implements OnInit{

  private _bannerService:BannerService = inject(BannerService);
  private _router:Router = inject(Router);

  banners:Array<BannerCarousel>=[];
  url:string=GLOBAL.url_imagen_carousel;

  ngOnInit(): void {
    this.getDatos();
  }


  getDatos():void{

      this._bannerService.getBannersCarouselActivosTematica(2).subscribe({

        next: (datos) => {
          
          //console.log(datos);
          this.banners = datos;

        }
        ,
        error: (error) => {this._router.navigate(["/error"])}
        ,
        complete: () => {}


      });

  }

}
