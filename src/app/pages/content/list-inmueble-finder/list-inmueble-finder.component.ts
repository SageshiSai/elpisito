import { Component, inject } from '@angular/core';
import { ContenedorBannersHorizontalComponent } from '../../../shared/components/contenedor-banners-horizontal/contenedor-banners-horizontal.component';
import { BannerService } from '../../../core/services/banner.service';
import { Router } from '@angular/router';
import { BannerHorizontal } from '../../../core/models/entities';

@Component({
  selector: 'app-list-inmueble-finder',
  imports: [ContenedorBannersHorizontalComponent],
  templateUrl: './list-inmueble-finder.component.html',
  styleUrl: './list-inmueble-finder.component.css'
})
export class ListInmuebleFinderComponent {

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
        this.banners = datos.filter( banner => banner.listInmuebleFinder == 1);
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
