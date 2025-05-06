import { Component, inject, OnInit } from '@angular/core';
import { FinderComponent } from '../../../shared/components/finder/finder.component';
import { BannerHorizontalComponent } from '../../../shared/components/banner-horizontal/banner-horizontal.component';
import { ListPortadaComponent } from '../../../shared/components/list-portada/list-portada.component';
import { BannerHorizontal } from '../../../core/models/entities';
import { BannerService } from '../../../core/services/banner.service';
import { Router } from '@angular/router';
import { ContenedorBannersHorizontalComponent } from "../../../shared/components/contenedor-banners-horizontal/contenedor-banners-horizontal.component";
import { ComunicacionService } from '../../../core/services/comunicacion.service';
import { AuthService } from '../../../core/services/auth.service';

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
  private _comunicacionService:ComunicacionService = inject(ComunicacionService);
  private _authService:AuthService = inject(AuthService);
  private _router:Router = inject(Router);

  banners:Array<BannerHorizontal> = [];
  usuario:string = "";
  isLogged:boolean;

  ngOnInit(): void {
    this._comunicacionService.logueo$.subscribe({
      next: (datos) => {
        this.isLogged = datos;

        if(this.isLogged){
          this.usuario = this._authService.getUsuario();
        }else{
          this.usuario = "";
        }
      }
    });
    this.getDatos();
  }


  getDatos():void{

    this._bannerService.getBannersHorizontalesActivos().subscribe({

      next: (datos) => {

        this.banners = datos.filter( banner => banner.home == 1);

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
