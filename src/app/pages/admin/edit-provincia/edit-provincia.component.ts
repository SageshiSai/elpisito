import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalAdminComponent } from "../../../shared/components/modal-admin/modal-admin.component";
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { FormsModule } from '@angular/forms';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincia } from '../../../core/models/entities';
import { Subscription } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';

@Component({
  selector: 'app-edit-provincia',
  imports: [ModalAdminComponent, PreloaderComponent,FormsModule],
  templateUrl: './edit-provincia.component.html',
  styleUrl: './edit-provincia.component.css'
})
export class EditProvinciaComponent implements OnInit,OnDestroy{

/////////////////////////////////////////////////
nFases:number = 1;
cargaCompletada:boolean = false;
fasesCargadas:number = 0;
/////////////////////////////////////////////////

@ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;


private _provinciaService:ProvinciaService=inject(ProvinciaService);
private _router:Router=inject(Router);
private _route:ActivatedRoute = inject(ActivatedRoute);

provincia:Provincia;
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

  this._provinciaService.getProvincia(this.id).subscribe({

    next: (datos) => {this.provincia = datos}
    ,
    error: (error) => {this._router.navigate(["/error"])}
    ,
    complete: () => { this.faseCarga() }

  });



}


edit():void{

  this.provincia.activo = Number(this.provincia.activo);
  this.provincia.nombre = this.provincia.nombre.toUpperCase();

  this._provinciaService.updateProvincia(this.provincia).subscribe({

    next: (datos) => {

      this.datosModal.titulo = "Modificar provincia";
      this.datosModal.status = "200";
      this.datosModal.mensaje = datos.mensaje;
      this.datosModal.origen = "provincia";   
      this.modalAdmin.showModal();

    }
    ,
    error: (error) => {

      this.datosModal.titulo = "Modificar provincia";
      this.datosModal.status = error.status; //400,403...
      this.datosModal.mensaje = error.error.mensaje;
      this.datosModal.origen = "provincia";         
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
