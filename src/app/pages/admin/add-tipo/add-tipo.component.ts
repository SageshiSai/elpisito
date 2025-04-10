import { Component, inject, ViewChild } from '@angular/core';
import { TipoService } from '../../../core/services/tipo.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tipo } from '../../../core/models/entities';
import { ModalData } from '../../../core/models/auxiliars';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';

@Component({
  selector: 'app-add-tipo',
  imports: [FormsModule, ModalAdminComponent],
  templateUrl: './add-tipo.component.html',
  styleUrl: './add-tipo.component.css'
})
export class AddTipoComponent {

    @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;


    private _tipoService:TipoService = inject(TipoService);
    private _router:Router = inject(Router);

    datosModal:ModalData={

      titulo:"",
      status:"",
      mensaje:"",
      origen:""

    };

    tipo:Tipo={

      nombre:""

    }


    add():void{

      this.tipo.nombre = this.tipo.nombre.toUpperCase();

      this._tipoService.addTipo(this.tipo).subscribe({

        next: (datos) => {

          this.datosModal.titulo = "+Tipo";
          this.datosModal.status = "200";
          this.datosModal.mensaje = datos.mensaje;
          this.datosModal.origen = "tipo";
          this.modalAdmin.showModal();


        } //Devuelve el objeto creado
        ,
        error: (error) => {


          this.datosModal.titulo = "+Tipo";
          this.datosModal.status = error.status; //400,403...
          this.datosModal.mensaje = error.error.mensaje;
          this.datosModal.origen = "tipo";
          this.modalAdmin.showModal();


        }
        ,
        complete: () => {}
      });


    }


}