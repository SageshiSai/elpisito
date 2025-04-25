import { Component, inject, ViewChild } from '@angular/core';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { FormsModule } from '@angular/forms';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { TematicaService } from '../../../core/services/tematica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tematica } from '../../../core/models/entities';
import { Subscription } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';

@Component({
  selector: 'app-edit-tematica',
  imports: [PreloaderComponent,FormsModule, ModalAdminComponent],
  templateUrl: './edit-tematica.component.html',
  styleUrl: './edit-tematica.component.css'
})
export class EditTematicaComponent {


  
  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  

  private _tematicaService:TematicaService=inject(TematicaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  tematica:Tematica;
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

    this._tematicaService.getTematica(this.id).subscribe({

      next: (datos) => {this.tematica = datos}
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => { this.faseCarga() }

    });



  }


  edit():void{

    this.tematica.activo = Number(this.tematica.activo);
    this.tematica.tematica = this.tematica.tematica.toUpperCase();

    this._tematicaService.updateTematica(this.tematica).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "Modificar temática";
        this.datosModal.status = "200";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "tematica";   
        this.modalAdmin.showModal();

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "Modificar tematica";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "tematica";         
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
