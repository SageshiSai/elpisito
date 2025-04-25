import { Component, inject, OnInit } from '@angular/core';
import { ContenedorBannersHorizontalComponent } from "../../../shared/components/contenedor-banners-horizontal/contenedor-banners-horizontal.component";
import { BannerService } from '../../../core/services/banner.service';
import { Router } from '@angular/router';
import { BannerHorizontal } from '../../../core/models/entities';

@Component({
  selector: 'app-consulta-hipoteca',
  imports: [ContenedorBannersHorizontalComponent],
  templateUrl: './consulta-hipoteca.component.html',
  styleUrl: './consulta-hipoteca.component.css'
})
export class ConsultaHipotecaComponent implements OnInit{

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

    this._bannerService.getBannersHorizontalesActivos().subscribe({

      next: (datos) => {
        this.banners = datos.filter( banner => banner.consultaHipotecas == 1);
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
