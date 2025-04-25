import { Component, inject, OnInit } from '@angular/core';
import { BannerService } from '../../../core/services/banner.service';
import { Router, RouterLink } from '@angular/router';
import { BannerHorizontal } from '../../../core/models/entities';
import { NgClass } from '@angular/common';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { GLOBAL } from '../../../core/environments/global';
import { NoImagenBannerDirective } from '../../../shared/directives/no-imagen-banner.directive';

@Component({
  selector: 'app-list-banner-horizontal',
  imports: [PreloaderComponent,NgClass,RouterLink,NoImagenBannerDirective],
  templateUrl: './list-banner-horizontal.component.html',
  styleUrl: './list-banner-horizontal.component.css'
})
export class ListBannerHorizontalComponent implements OnInit {


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _bannerService:BannerService = inject(BannerService);
  private _router:Router = inject(Router);

  aDatos:Array<BannerHorizontal>= [];

  url:string = GLOBAL.url_imagen_banner;

  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._bannerService.getBannersHorizontales().subscribe({

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
