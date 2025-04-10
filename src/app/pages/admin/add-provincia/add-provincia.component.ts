import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import { Provincia } from '../../../core/models/entities';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';

@Component({
  selector: 'app-add-provincia',
  imports: [FormsModule, ModalAdminComponent],
  templateUrl: './add-provincia.component.html',
  styleUrl: './add-provincia.component.css'
})
export class AddProvinciaComponent {


  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;


  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router = inject(Router);

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  provincia:Provincia={

    nombre:""

  }


  add():void{

    this.provincia.nombre = this.provincia.nombre.toUpperCase();

    this._provinciaService.addProvincia(this.provincia).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "+Provincia";
        this.datosModal.status = "200";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "provincia";
        this.modalAdmin.showModal();


      } //Devuelve el objeto creado
      ,
      error: (error) => {


        this.datosModal.titulo = "+Provincia";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "provincia";
        this.modalAdmin.showModal();


      }
      ,
      complete: () => {}
    });


  }





}
