import { Component, inject, OnInit } from '@angular/core';
import { PreloaderComponent } from "../preloader/preloader.component";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Poblacion, Tipo } from '../../../core/models/entities';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { TipoService } from '../../../core/services/tipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finder',
  imports: [PreloaderComponent,FormsModule],
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.css'
})
export class FinderComponent implements OnInit {




   ///////////////////////////////////////////////
  nFases:number=2;
  cargaCompletada:boolean=false;
  fasesCargadas:number=0;
  ///////////////////////////////////////////////

  aPoblaciones:Poblacion[];
  aTipos:Tipo[];
  aOperaciones:string[] =  ["VENTA","ALQUILER","TRASPASO"];

  poblacionElegida:number;
  tipoElegido:number;
  operacionElegida:string;

  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _tipoService:TipoService = inject(TipoService);
  private _router:Router = inject(Router);


  ngOnInit(): void {
    this.getDatos();
  }


  getDatos():void{
    //Traemos los datos para rellenar los select

    this._poblacionService.getPoblacionesActivas().subscribe({

      next: (datos)=>{

        this.aPoblaciones = datos;
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga();}

    });


    this._tipoService.getTiposActivos().subscribe({

      next: (datos)=>{

        this.aTipos = datos;
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga();}

    });


  }//end getDatos



  find():void{

    this._router.navigate(["/list-inmueble-finder",this.tipoElegido,this.poblacionElegida,this.operacionElegida.toLowerCase()]);

  }

  /////////////////////////////////////////////////////
  faseCarga():void{

    this.fasesCargadas++;

    if(this.fasesCargadas == this.nFases){
      this.cargaCompletada = true;
    }
  }
  //////////////////////////////////////////////////






}
