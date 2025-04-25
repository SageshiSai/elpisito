import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { TematicaService } from '../../../core/services/tematica.service';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import { Tematica } from '../../../core/models/entities';

@Component({
  selector: 'app-add-tematica',
  imports: [FormsModule, ModalAdminComponent],
  templateUrl: './add-tematica.component.html',
  styleUrl: './add-tematica.component.css'
})
export class AddTematicaComponent {

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  

  private _tematicaService:TematicaService = inject(TematicaService);
  private _router:Router = inject(Router);

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  tematica:Tematica={

    tematica:""

  }


  add():void{

    this.tematica.tematica = this.tematica.tematica.toUpperCase();

    this._tematicaService.addTematica(this.tematica).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "+Temática";
        this.datosModal.status = "201";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "tematica";   
        this.modalAdmin.showModal();


      } //Devuelve el objeto creado
      ,
      error: (error) => {
    

        this.datosModal.titulo = "+Temática";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "tematica";         
        this.modalAdmin.showModal();


      }
      ,
      complete: () => {}
    });

    
  }


}
