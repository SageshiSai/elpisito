import { Component, inject, OnInit } from '@angular/core';
import { FinderComponent } from '../../../shared/components/finder/finder.component';
import { BannerHorizontalComponent } from '../../../shared/components/banner-horizontal/banner-horizontal.component';
import { ListPortadaComponent } from '../../../shared/components/list-portada/list-portada.component';
import { BannerHorizontal } from '../../../core/models/entities';
import { BannerService } from '../../../core/services/banner.service';
import { Router } from '@angular/router';
import { ContenedorBannersHorizontalComponent } from "../../../shared/components/contenedor-banners-horizontal/contenedor-banners-horizontal.component";

@Component({
  selector: 'app-home',
  imports: [FinderComponent, ListPortadaComponent, ContenedorBannersHorizontalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _bannerService:BannerService = inject(BannerService);
  private _router:Router = inject(Router);

  banners:Array<BannerHorizontal> = [];
  
  ngOnInit(): void {
    
    this.getDatos();
  }


  getDatos():void{

    this._bannerService.getBannersHorizontalesActivosHome().subscribe({

      next: (datos) => {
        this.banners = datos;
        //console.log(this.banners);
      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga()}


    })



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
