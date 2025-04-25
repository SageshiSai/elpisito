import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import Modal from 'bootstrap/js/dist/modal';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-admin',
  imports: [FormsModule],
  templateUrl: './modal-admin.component.html',
  styleUrl: './modal-admin.component.css'
})
export class ModalAdminComponent implements OnInit, OnDestroy{



  private _router:Router=inject(Router);

  @ViewChild('modalAdmin') modalAdmin:ElementRef;
  @Input() datos:ModalData;

  clickHandler:any;

  seleccionada:string="listado";


  ngOnInit(): void {

    //Necesitamos referenciar la función que irá como callback en el addEventListener
    //porque de esta manera la podremos destruir (con su referencia) en el Hook OnDestroy
    //Si, por el contrario, utilizamos una función anónima el método removeEventListener
    //no sabrá cual es la función que está en memoria que debe de eliminar (porque no tiene referencia!!!)

     this.clickHandler = () => {

      if(this.datos.origen != "inmueble"){
        this._router.navigate(["/admin/list-"+ this.datos.origen]);
      }else{

        switch(this.seleccionada){
          case "listado":
            this._router.navigate(["/admin/list-inmueble"]);
            break;
          case "imagenes":
            this._router.navigate(["/admin/edit-imagen",this.datos.id]);
            break;
          case "archivos":
          this._router.navigate(["/admin/edit-archivo",this.datos.id]);
          break;
        }


      }



    }
  }


  ngOnDestroy(): void {
    //Para evitar "memory leaks" debemos destruir programáticamete aquellos objetos
    //que van a quedar presentes en memoria: Observables hot, listeners...

    this.modalAdmin.nativeElement.removeEventListener('hidden.bs.modal', this.clickHandler);


    }


  showModal():void{


    const modal = new Modal(this.modalAdmin.nativeElement);
    modal.show();

    //En el momento de abrirse la ventana modal, creamos un eventlistener que está
    //a la escucha del evento 'hidden.bs.modal' (de bootstrap). Este evento se produce
    //cuando pulsamos el botón cerrar de la ventana modal automáticamente. La función
    //de callback se ejecuta inmediatamente en el momento en que pulsamos el boton cerrar
    //y nos redirige (en este caso) a la página que necesitemos...

    this.modalAdmin.nativeElement.addEventListener('hidden.bs.modal', this.clickHandler);


  };



}


