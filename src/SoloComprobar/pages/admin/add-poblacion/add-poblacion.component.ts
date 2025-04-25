import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { Poblacion, Provincia } from '../../../core/models/entities';

import { FormsModule } from '@angular/forms';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-poblacion',
  imports: [FormsModule, ModalAdminComponent, PreloaderComponent,NgClass],
  templateUrl: './add-poblacion.component.html',
  styleUrl: './add-poblacion.component.css'
})
export class AddPoblacionComponent implements OnInit{


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  

  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router = inject(Router);

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  aProvincias:Array<Provincia> = [];

  poblacion:Poblacion={

    nombre:"",
    provincia:{

      nombre:""
    }

  }


  ngOnInit(): void {
    this.getDatos();
  }



  getDatos():void{

    this._provinciaService.getProvincias().subscribe({

      next: (datos) => {this.aProvincias = datos }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga() }
    });



  }

  add():void{

    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.addPoblacion(this.poblacion).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "+Población";
        this.datosModal.status = "201";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "poblacion";   
        this.modalAdmin.showModal();


      } //Devuelve el objeto creado
      ,
      error: (error) => {
    

        this.datosModal.titulo = "+Población";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "poblacion";         
        this.modalAdmin.showModal();


      }
      ,
      complete: () => {}
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
