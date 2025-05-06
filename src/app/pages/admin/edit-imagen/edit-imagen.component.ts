import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImagenService } from '../../../core/services/imagen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { Imagen, Inmueble } from '../../../core/models/entities';
import { GLOBAL } from '../../../core/environments/global';
import { InmuebleService } from '../../../core/services/inmueble.service';


@Component({
  selector: 'app-edit-imagen',
  imports: [PreloaderComponent],
  templateUrl: './edit-imagen.component.html',
  styleUrl: './edit-imagen.component.css'
})
export class EditImagenComponent implements OnInit{


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////


  @ViewChild('imagen') imagen:ElementRef;

  id:number;


  inmueble:Inmueble;
  aImagenes:Array<Imagen>=[];//Todas las imágenes del inmueble
  url:string = GLOBAL.url_imagen; //http://localhost:8080/media/imagen/

  private _imagenService:ImagenService = inject(ImagenService);
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

    this.getImagenesInmueble();

  }


  upload(e:any):void{

    const files = e.target.files;

    if(files){

      const formData = new FormData();

      formData.append('imagen',files[0]); //'imagen' es MUY IMPORTANTE!!!. El nombre de este parámetro tiene que coincidir con el definido en el end point de la API (@PostMapping("/upload/{idInmueble}")) como @RequestParam("imagen")

      this._imagenService.uploadImagen(formData,this.id).subscribe({

        next: (datos)=>{


        }
        ,
        error: (error)=>{this._router.navigate(['/error'])}
        ,
        complete: ()=>{this.getImagenesInmueble();}

      });



      //Limpiamos el control #imagen (que es un input) por si lo queremos
      //volver a utilizar
      this.imagen.nativeElement.value=null;



    }

  }//end upload

  eliminarImagen(id:number):void{

    this._imagenService.deleteImagen(id).subscribe({

      next: (datos)=>{

      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{

        this.getImagenesInmueble();


      }

    });


  }



  getImagenesInmueble(){



    this.aImagenes=[]; //Limpiamos el array

    this._imagenService.getImagenesPorInmueble(this.id).subscribe({

      next: (datos)=>{

        this.aImagenes = datos;


      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{}


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
