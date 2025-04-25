import { Component, inject } from '@angular/core';
import { ContenedorBannersHorizontalComponent } from '../../../shared/components/contenedor-banners-horizontal/contenedor-banners-horizontal.component';
import { BannerService } from '../../../core/services/banner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerHorizontal, Inmueble } from '../../../core/models/entities';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { TipoService } from '../../../core/services/tipo.service';
import { ComunicacionService } from '../../../core/services/comunicacion.service';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { MayusculasPipe } from "../../../shared/pipes/mayusculas.pipe";
import { FichaInmuebleComponent } from "../../../shared/components/ficha-inmueble/ficha-inmueble.component";

@Component({
  selector: 'app-list-inmueble-finder',
  imports: [ContenedorBannersHorizontalComponent, PreloaderComponent, MayusculasPipe, FichaInmuebleComponent],
  templateUrl: './list-inmueble-finder.component.html',
  styleUrl: './list-inmueble-finder.component.css'
})
export class ListInmuebleFinderComponent {

  /////////////////////////////////////////////////
  nFases:number = 4;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _bannerService:BannerService = inject(BannerService);
  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _tipoService:TipoService = inject(TipoService);
  private _router:Router = inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _comunicacionService:ComunicacionService = inject(ComunicacionService);


  banners:Array<BannerHorizontal> = [];
  poblacion:number;
  tipo:number;
  operacion:string;
  cartelNoInmuebles:boolean=false;

  nombrePoblacion:string;
  nombreTipo:string;

  aDatos:Inmueble[];
  
  ngOnInit(): void {
    
    this.getDatos();
  }


  getDatos():void{

     //CONSEGUIMOS LOS PARÁMETROS DE LA RUTA
     this._route.params.subscribe({
      next: (params)=>{
        this.tipo=params['ti'];
        this.poblacion=params['po'];
        this.operacion=params['op'];
        
      }
    });

    //CONSEGUIMOS EL NOMBRE DE LA POBLACIÓN ELEGIDA YA QUE TENEMOS SU ID
    this._poblacionService.getPoblacion(this.poblacion).subscribe({

      next: (datos)=>{
        this.nombrePoblacion = datos.nombre;
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga()}

    });


        //CONSEGUIMOS EL NOMBRE DEL TIPO ELEGIDO YA QUE TENEMOS SU ID
        this._tipoService.getTipo(this.tipo).subscribe({

          next: (datos)=>{
            this.nombreTipo = datos.nombre;
          }
          ,
          error: (error)=>{this._router.navigate(["/error"])}
          ,
          complete: ()=>{this.faseCarga()}
    
        });

  
  //LLAMAMOS AL SERVICIO PASÁNDOLE LOS CRITERIOS DE BÚSQUEDA Y RECIBIMOS UN ARRAY DE INMUEBLES
  //CON LOS INMUEBLES QUE LA API HA SELECCIONADO
  this._inmuebleService.getInmueblesFinder(this.tipo,this.poblacion,this.operacion).subscribe({

    next: (datos)=>{
      this.aDatos = datos;
      if(this.aDatos.length == 0){

        this.cartelNoInmuebles = true;
      }
    }
    ,
    error: (error)=>{this._router.navigate(["/error"])}
    ,
    complete: ()=>{this.faseCarga()}

  });



    this._bannerService.getBannersHorizontalesActivos().subscribe({

      next: (datos) => {
        this.banners = datos.filter( banner => banner.listInmuebleFinder == 1);
        //console.log(this.banners);
      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga()}


    })



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
