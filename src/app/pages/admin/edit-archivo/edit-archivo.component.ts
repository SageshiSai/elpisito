import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { Archivo, Inmueble } from '../../../core/models/entities';
import { GLOBAL } from '../../../core/environments/global';
import { ArchivoService } from '../../../core/services/archivo.service';
import { InmuebleService } from '../../../core/services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-archivo',
  imports: [PreloaderComponent],
  templateUrl: './edit-archivo.component.html',
  styleUrl: './edit-archivo.component.css'
})
export class EditArchivoComponent implements OnInit{



  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////


  @ViewChild('archivo') archivo:ElementRef;

  id:number;


  inmueble:Inmueble;
  aArchivos:Array<Archivo>=[];//Todas los archivos del inmueble
  url:string = GLOBAL.url_archivo; //http://localhost:8080/media/archivo/

  private _archivoService:ArchivoService = inject(ArchivoService);
  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _router:Router = inject(Router);




  ngOnInit(): void {

    this.getDatos();
  }





  getDatos():void{

    //El primer dato que necesito es el id del inmueble
    //que podemos extraer de la ruta
    //para poder asignar las imágenes a un inmueble determinado

    this._route.params.subscribe({
      next: (params)=>{
        this.id= params['id'];
      }

    });

    this._inmuebleService.getInmueble(this.id).subscribe({

         next: (datos)=>{

            this.inmueble = datos;
            this.inmueble.direccionCompleta = `${datos.via} ${datos.nombreVia} ${datos.numero} ${datos.planta}${datos.puerta}`

          }
          ,
          error: (error)=>{this._router.navigate(['/error'])}
          ,
          complete: ()=>{this.faseCarga();}


    });

    this.getArchivosInmueble();

  }


  upload(e:any):void{

    const files = e.target.files;

    if(files){

      const formData = new FormData();

      formData.append('archivo',files[0]); //'archivo' es MUY IMPORTANTE!!!. El nombre de este parámetro tiene que coincidir con el definido en el end point de la API public ResponseEntity<?> uploadArchivo(@RequestParam("archivo") MultipartFile multipartFile, @PathVariable Long idInmueble) {

      this._archivoService.uploadArchivo(formData,this.id).subscribe({

        next: (datos)=>{


        }
        ,
        error: (error)=>{this._router.navigate(['/error'])}
        ,
        complete: ()=>{this.getArchivosInmueble();}

      });



      //Limpiamos el control #archivo (que es un input) por si lo queremos
      //volver a utilizar
      this.archivo.nativeElement.value=null;



    }

  }//end upload

  eliminarArchivo(id:number):void{

    this._archivoService.deleteArchivo(id).subscribe({

      next: (datos)=>{

      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{

        this.getArchivosInmueble();


      }

    });


  }



  getArchivosInmueble(){



    this.aArchivos=[]; //Limpiamos el array

    this._archivoService.getArchivosPorInmueble(this.id).subscribe({

      next: (datos)=>{

        this.aArchivos = datos;

        for( let archivo  of  this.aArchivos){

          archivo.extension = this.extraeExtension(archivo.nombre!);

        }


      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{}


      });





  }


  extraeExtension(nombre:string):string{


    const partes = nombre.split('.');
    return partes[1].toLowerCase();


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
