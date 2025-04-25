import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TipoService } from '../../../core/services/tipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { FormsModule } from '@angular/forms';
import { Tipo } from '../../../core/models/entities';
import { Subscription } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';

@Component({
  selector: 'app-edit-tipo',
  imports: [PreloaderComponent,FormsModule, ModalAdminComponent],
  templateUrl: './edit-tipo.component.html',
  styleUrl: './edit-tipo.component.css'
})
export class EditTipoComponent implements OnInit,OnDestroy{


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  

  private _tipoService:TipoService=inject(TipoService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  tipo:Tipo;
  id:number;
  suscripcion:Subscription;

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

    this._tipoService.getTipo(this.id).subscribe({

      next: (datos) => {this.tipo = datos}
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => { this.faseCarga() }

    });



  }


  edit():void{

    this.tipo.activo = Number(this.tipo.activo);
    this.tipo.nombre = this.tipo.nombre.toUpperCase();

    this._tipoService.updateTipo(this.tipo).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "Modificar tipo";
        this.datosModal.status = "200";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "tipo";   
        this.modalAdmin.showModal();

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "Modificar tipo";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "tipo";         
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
