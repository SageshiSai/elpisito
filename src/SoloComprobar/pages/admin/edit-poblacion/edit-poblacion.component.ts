import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { FormsModule } from '@angular/forms';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poblacion, Provincia } from '../../../core/models/entities';
import { Subscription } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-poblacion',
  imports: [PreloaderComponent,FormsModule, ModalAdminComponent,NgClass],
  templateUrl: './edit-poblacion.component.html',
  styleUrl: './edit-poblacion.component.css'
})
export class EditPoblacionComponent implements OnInit, OnDestroy{

  
  /////////////////////////////////////////////////
  nFases:number = 2;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  

  private _poblacionService:PoblacionService=inject(PoblacionService);
  private _provinciaService:ProvinciaService=inject(ProvinciaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  poblacion:Poblacion;
  id:number;
  suscripcion:Subscription;
  aProvincias:Array<Provincia> = [];

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };



  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    //conseguimos el id de la ruta (Observable hot)
    this.suscripcion = this._route.params.subscribe({

      next:(params)=> {this.id = params['id'] }
    });

    this._poblacionService.getPoblacion(this.id).subscribe({

      next: (datos) => {this.poblacion = datos}
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => { this.faseCarga() }

    });


    this._provinciaService.getProvincias().subscribe({

      next: (datos) => {this.aProvincias = datos}
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => { this.faseCarga() }

    });




  }/* fin getDatos */


  edit():void{

    this.poblacion.activo = Number(this.poblacion.activo);
    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.updatePoblacion(this.poblacion).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "Modificar población";
        this.datosModal.status = "200";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "poblacion";   
        this.modalAdmin.showModal();

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "Modificar poblacion";
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
