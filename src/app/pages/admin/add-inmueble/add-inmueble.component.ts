import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { FormsModule } from '@angular/forms';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import { Inmobiliaria, Inmueble, Poblacion, Tipo } from '../../../core/models/entities';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { TipoService } from '../../../core/services/tipo.service';
import { InmobiliariaService } from '../../../core/services/inmobiliaria.service';


@Component({
  selector: 'app-add-inmueble',
  imports: [FormsModule, ModalAdminComponent, PreloaderComponent,NgClass],
  templateUrl: './add-inmueble.component.html',
  styleUrl: './add-inmueble.component.css'
})
export class AddInmuebleComponent implements OnInit {

  /////////////////////////////////////////////////
  nFases:number = 3;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////


  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  @ViewChild('imagen') inputImagen:ElementRef;


  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _tipoService:TipoService = inject(TipoService);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _router:Router = inject(Router);


  aTipos:Array<Tipo> = [];
  aInmobiliarias:Array<Inmobiliaria> = [];
  aPoblaciones:Array<Poblacion> = [];

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

inmueble:Inmueble = {

  amueblado:0,
  apertura:"",
  archivos:[],
  ascensor:0,
  cp:"",
  descripcion:"",
  inmobiliaria:{
      nombre:"",
      representante:""
  }
  ,
  imagenes:[],
  jardin:0,
  nombreVia:"",
  numero:"",
  numeroBalcones:"",
  numeroBanhos:"",
  numeroHabitaciones:"",
  operacion:"",
  oportunidad:0,
  orientacion:"",
  piscina:0,
  planta:0,
  plazasGaraje:"",
  portada:0,
  precio:0,
  puerta:"",
  superficieConstruida:0,
  superficieUtil:0,
  tendedero:0,
  tipoCalefaccion:"",
  claim:"",
  trastero:0,
  via:"",
  poblacion: {
      nombre:"",
      provincia:{
        nombre: ""
      }
	}
  ,
  tipo: {
		nombre:""
	}

}



  ngOnInit(): void {
    this.getDatos();
  }



  getDatos():void{

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


  add():void{

    this.inmueble.amueblado = Number(this.inmueble.amueblado);
    this.inmueble.ascensor = Number(this.inmueble.ascensor);
    this.inmueble.piscina = Number(this.inmueble.piscina);
    this.inmueble.trastero = Number(this.inmueble.trastero);
    this.inmueble.jardin = Number(this.inmueble.jardin);
    this.inmueble.tendedero = Number(this.inmueble.tendedero);
    this.inmueble.portada = Number(this.inmueble.portada);
    this.inmueble.oportunidad = Number(this.inmueble.oportunidad);



    this.inmueble.claim = this.inmueble.claim.toUpperCase();
    this.inmueble.nombreVia = this.inmueble.nombreVia.toUpperCase();


    this._inmuebleService.addInmueble(this.inmueble).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "+Inmueble";
        this.datosModal.status = "201";
        this.datosModal.origen = "inmueble";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.id = datos.inmueble.id;//id del inmueble recién creado
        this.datosModal.error = false;
        this.modalAdmin.showModal();


      }
      ,
      error: (error) => {

        this.datosModal.titulo = "+Inmueble";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "inmueble";
        this.datosModal.error = true;
        this.modalAdmin.showModal();


      }
      ,
      complete: () => {



      }

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
