import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { EurosPipe } from "../../../shared/pipes/euros.pipe";
import { MetrosCuadradosPipe } from "../../../shared/pipes/metros-cuadrados.pipe";
import { MinusculasPipe } from "../../../shared/pipes/minusculas.pipe";
import { AmuebladoPipe } from "../../../shared/pipes/amueblado.pipe";
import { PlazasPipe } from "../../../shared/pipes/plazas.pipe";
import { SiNoPipe } from "../../../shared/pipes/si-no.pipe";
import { CarouselFichaComponent } from "../../../shared/components/carousel-ficha/carousel-ficha.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL } from '../../../core/environments/global';
import { VisorImagenComponent } from '../../../shared/components/visor-imagen/visor-imagen.component';
import { BannerHorizontal, Inmueble } from '../../../core/models/entities';
import { ArchivoService } from '../../../core/services/archivo.service';
import { ContenedorBannersHorizontalComponent } from "../../../shared/components/contenedor-banners-horizontal/contenedor-banners-horizontal.component";
import { BannerService } from '../../../core/services/banner.service';


@Component({
  selector: 'app-detail-inmueble',
  imports: [PreloaderComponent, EurosPipe, MetrosCuadradosPipe, MinusculasPipe, AmuebladoPipe, PlazasPipe, SiNoPipe, CarouselFichaComponent, MatTooltipModule, ContenedorBannersHorizontalComponent],
  templateUrl: './detail-inmueble.component.html',
  styleUrl: './detail-inmueble.component.css'
})
export class DetailInmuebleComponent implements OnInit, OnDestroy{

    /////////////////////////////////////////////////
    nFases:number = 2;
    cargaCompletada:boolean = false;
    fasesCargadas:number = 0;
    /////////////////////////////////////////////////


  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _router:Router = inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _dialog:MatDialog = inject(MatDialog);
  private _archivoService:ArchivoService = inject(ArchivoService);
  private _bannerService:BannerService = inject(BannerService);

  id:number;
  suscripcion:Subscription;
  datos:Inmueble;
  urlImagen:string = GLOBAL.url_imagen;
  urlArchivo:string = GLOBAL.url_archivo;
  banners:Array<BannerHorizontal> = [];


  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();//De esta forma destruimos el Observable Hot liberando memoria
  }


  getDatos():void{

    this.suscripcion = this._route.params.subscribe({

      next: (params) => { this.id = params['id']}
      ,
      error: (error) => { this._router.navigate(["/error"])}


    }); //Observable Hot. Es necesario darle un tratamiento de destrucción cuando el componente se desmonte



    this._inmuebleService.getInmueble(this.id).subscribe({

      next: (datos) => {

        this.datos = datos;


      }
      ,
      error: (error) => { this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga()}

    });


    this._bannerService.getBannersHorizontalesActivos().subscribe({

      next: (datos) => {
        this.banners = datos.filter( banner => banner.detailInmueble == 1);
        //console.log(this.banners);
      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga()}


    })






  }//end getDatos



  abrirVisor(index:number):void{

    this._dialog.open( VisorImagenComponent,{

      data:{
        imagenes: this.datos.imagenes.map( img => this.urlImagen + img.nombre),
        index:index
      }
      ,

      width:'auto' //Para que se ajuste al tamaño de la imagen (que no se distosione la proporción)
      ,
      height:'auto'//Para que se ajuste al tamaño de la imagen (que no se distosione la proporción)
      ,
      panelClass: ["custom-style"]//Clase para personalizar el estilo
      ,
      maxWidth:'100vw' //Asegura que no sobresalga del área visible
      ,
      maxHeight:'100vh' //Asegura que no se desborde


    });

  }



  descargar(nombreArchivo:string):void{

    //Ejemplo de lo que recibe el método: 1743591845725.pdf

      //Llamamos al servicio para descargar el archivo (file)
      this._archivoService.getArchivoPorSuNombre(nombreArchivo).subscribe( (blob) => {

        //Creamos un botón <a> virtual para poder ejecutar "al vuelo" el link
        const downloadLink = document.createElement('a');
        const fileURL = URL.createObjectURL(blob);
        downloadLink.href = fileURL;
        downloadLink.download = nombreArchivo;
        downloadLink.click();

        //Limpiar el objeto URL y eliminar el enlace de DOM
        URL.revokeObjectURL(fileURL);

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



