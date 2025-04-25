import { Component, inject, OnInit } from '@angular/core';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { NgClass } from '@angular/common';
import { NoImagenBannerDirective } from '../../../shared/directives/no-imagen-banner.directive';
import { Router, RouterLink } from '@angular/router';
import { InmobiliariaService } from '../../../core/services/inmobiliaria.service';
import { Inmobiliaria } from '../../../core/models/entities';
import { GLOBAL } from '../../../core/environments/global';
import { NoLogoInmobiliariaDirective } from '../../../shared/directives/no-logo-inmobiliaria.directive';


@Component({
  selector: 'app-list-inmobiliaria',
  imports: [PreloaderComponent,NgClass,RouterLink,NoLogoInmobiliariaDirective],
  templateUrl: './list-inmobiliaria.component.html',
  styleUrl: './list-inmobiliaria.component.css'
})
export class ListInmobiliariaComponent implements OnInit {



  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _router:Router = inject(Router);

  aDatos:Array<Inmobiliaria>= [];

  url:string = GLOBAL.url_imagen_logo_inmobiliaria;
  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._inmobiliariaService.getInmobiliarias().subscribe({

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
