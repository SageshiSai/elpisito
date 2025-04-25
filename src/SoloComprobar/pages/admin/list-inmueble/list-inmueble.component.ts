import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { Inmueble } from '../../../core/models/entities';
import { NoLogoInmobiliariaDirective } from '../../../shared/directives/no-logo-inmobiliaria.directive';
import { GLOBAL } from '../../../core/environments/global';
import { MayusculasPipe } from '../../../shared/pipes/mayusculas.pipe';
import { EurosPipe } from '../../../shared/pipes/euros.pipe';

@Component({
  selector: 'app-list-inmueble',
  imports: [PreloaderComponent,NgClass,RouterLink,NoLogoInmobiliariaDirective,MayusculasPipe,EurosPipe],
  templateUrl: './list-inmueble.component.html',
  styleUrl: './list-inmueble.component.css'
})
export class ListInmuebleComponent implements OnInit {


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _router:Router = inject(Router);

  aDatos:Array<Inmueble>= [];
  url:string = GLOBAL.url_imagen_logo_inmobiliaria;

  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._inmuebleService.getInmuebles().subscribe({

      next: (datos) => {

        this.aDatos = datos;


        for(let dato of this.aDatos) {
          dato.direccionCompleta = `${dato.via} ${dato.nombreVia} ${dato.numero} ${dato.planta}${dato.puerta}`
        }


      }
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
