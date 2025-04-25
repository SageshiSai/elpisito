import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { FormsModule } from '@angular/forms';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { TipoService } from '../../../core/services/tipo.service';
import { InmobiliariaService } from '../../../core/services/inmobiliaria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmobiliaria, Inmueble, Poblacion, Tipo } from '../../../core/models/entities';
import { Subscription } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-inmueble',
  imports: [PreloaderComponent,FormsModule, ModalAdminComponent,NgClass],
  templateUrl: './edit-inmueble.component.html',
  styleUrl: './edit-inmueble.component.css'
})
export class EditInmuebleComponent implements OnInit,OnDestroy{



  /////////////////////////////////////////////////
  nFases:number = 4;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;


  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _tipoService:TipoService = inject(TipoService);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _router:Router = inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  inmueble:Inmueble;
  id:number;
  suscripcion:Subscription;

  aTipos:Array<Tipo> = [];
  aInmobiliarias:Array<Inmobiliaria> = [];
  aPoblaciones:Array<Poblacion> = [];

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


    this._inmuebleService.getInmueble(this.id).subscribe({

      next: (datos) => {this.inmueble = datos}
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => { this.faseCarga() }

    });


    this._tipoService.getTipos().subscribe({

      next: (datos) => {
        this.aTipos = datos;

      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga() }
    });


    this._poblacionService.getPoblaciones().subscribe({

      next: (datos) => {
        this.aPoblaciones = datos;

      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga() }
    });


    this._inmobiliariaService.getInmobiliarias().subscribe({

      next: (datos) => {
        this.aInmobiliarias = datos;

      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga() }
    });



  }


  edit():void{

    //CONVERTIMOS LOS BOOLEAN DE LOS CHECKS EN NUMBER PARA QUE LO ENTIENDA LA PARTE DE BACK (JAVA)
    this.inmueble.amueblado = Number(this.inmueble.amueblado);
    this.inmueble.ascensor = Number(this.inmueble.ascensor);
    this.inmueble.piscina = Number(this.inmueble.piscina);
    this.inmueble.trastero = Number(this.inmueble.trastero);
    this.inmueble.jardin = Number(this.inmueble.jardin);
    this.inmueble.tendedero = Number(this.inmueble.tendedero);
    this.inmueble.portada = Number(this.inmueble.portada);
    this.inmueble.oportunidad = Number(this.inmueble.oportunidad);
    this.inmueble.activo = Number(this.inmueble.activo);


    this.inmueble.claim = this.inmueble.claim.toUpperCase();
    this.inmueble.nombreVia = this.inmueble.nombreVia.toUpperCase();

    this._inmuebleService.updateInmueble(this.inmueble).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "Modificar inmueble";
        this.datosModal.status = "200";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "inmueble";
        this.datosModal.id = datos.inmueble.id;//id del inmueble recién creado
        this.datosModal.error = false;
        this.modalAdmin.showModal();

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "Modificar inmueble";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "inmueble";
        this.datosModal.error = true;
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
