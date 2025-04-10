import { Component, inject, OnInit } from '@angular/core';
import { FichaInmuebleComponent } from '../ficha-inmueble/ficha-inmueble.component';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { Inmueble } from '../../../core/models/entities';
import { PreloaderComponent } from "../preloader/preloader.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-portada',
  imports: [FichaInmuebleComponent, PreloaderComponent],
  templateUrl: './list-portada.component.html',
  styleUrl: './list-portada.component.css'
})
export class ListPortadaComponent implements OnInit{

    /////////////////////////////////////////////////
    nFases:number = 1;
    cargaCompletada:boolean = false;
    fasesCargadas:number = 0;
    /////////////////////////////////////////////////

  private _inmuebleService:InmuebleService=inject(InmuebleService);
  private _router:Router=inject(Router);

  inmuebles:Array<Inmueble> = [];

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    this._inmuebleService.getInmueblesPortada().subscribe({

      next: (datos) => {
        console.log(datos);
        this.inmuebles = datos;
      }
      ,
      error: (error) => {this._router.navigate(["/error"]);}
      ,
      complete: () => {this.faseCarga()}

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
