import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { FormsModule } from '@angular/forms';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { BannerService } from '../../../core/services/banner.service';
import { ImagenBannerService } from '../../../core/services/imagen-banner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerHorizontal } from '../../../core/models/entities';
import { Subscription } from 'rxjs';
import { GLOBAL } from '../../../core/environments/global';
import { ModalData } from '../../../core/models/auxiliars';

@Component({
  selector: 'app-edit-banner-horizontal',
  imports: [PreloaderComponent,FormsModule, ModalAdminComponent],
  templateUrl: './edit-banner-horizontal.component.html',
  styleUrl: './edit-banner-horizontal.component.css'
})
export class EditBannerHorizontalComponent implements OnInit, OnDestroy {


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  @ViewChild('imagen') inputImagen:ElementRef;

  private _bannerService:BannerService = inject(BannerService);
  private _imagenBannerService:ImagenBannerService = inject(ImagenBannerService);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _router:Router=inject(Router);

  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview: string | ArrayBuffer | null = null;
  labelElegirImagen:string = "ELEGIR IMAGEN";
  hayImagen:boolean;
  id:number;
  idImagen:number|undefined;
  bannerHorizontal:BannerHorizontal;
  suscripcion:Subscription;
  url:string = GLOBAL.url_imagen_banner; //http://localhost:8080/media/imagen-banner/

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };



  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {

    this.getDatos();
  }


  getDatos():void{

    //conseguimos el id de la ruta (Observable hot)
    this.suscripcion = this._route.params.subscribe({

      next:(params)=> {this.id = params['id'] }

    });


    this._bannerService.getBannerHorizontal(this.id).subscribe({

      next: (datos) => {
        this.bannerHorizontal = datos;

        this.idImagen = datos.imagen?.id;

        if(this.bannerHorizontal.imagen){
          this.hayImagen = true;
        }else{
          this.hayImagen = false;
        }
      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => { this.faseCarga() }

    });




  }



  edit():void{


     //CONVERTIMOS LOS BOOLEAN DE LOS CHECKS EN NUMBER
    this.bannerHorizontal.home = Number(this.bannerHorizontal.home);
    this.bannerHorizontal.consultaHipotecas = Number(this.bannerHorizontal.consultaHipotecas);
    this.bannerHorizontal.detailInmueble = Number(this.bannerHorizontal.detailInmueble);
    this.bannerHorizontal.servicios = Number(this.bannerHorizontal.servicios);
    this.bannerHorizontal.listInmuebleFinder = Number(this.bannerHorizontal.listInmuebleFinder);

    this.bannerHorizontal.activo = Number(this.bannerHorizontal.activo);


    //console.log(this.bannerHorizontal);

    this._bannerService.updateBannerHorizontal(this.bannerHorizontal).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "Modificar banner horizontal";
        this.datosModal.status = "201";
        this.datosModal.origen = "banner-h";

        if(this.imagenesSeleccionadas){
          this.datosModal.mensaje = datos.mensaje + ". La imagen del banner ha sido subida al servidor";
        }else{
          this.datosModal.mensaje = datos.mensaje + ". La imagen del banner no ha sido modificada o ha sido eliminada.";
          this.modalAdmin.showModal();
        }

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "Modificar banner horizontal";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje + ". La imagen no se ha subido al servidor.";
        this.datosModal.origen = "banner-h";
        this.modalAdmin.showModal();


      }
      ,
      complete: () => {

         if(this.imagenesSeleccionadas){ //Si se ha seleccionado la imagen
          this.uploadImagen(this.id);
        }

      }
    });

  }





  eliminarImagen():void{

    this.hayImagen=false;

    //Si elegimos sustituir la imagen debemos eliminarla para que la BBDD (relación OneToOne )
    //y la carpeta del servidor de archivos físicos no se llene de basura.
    //En la API deberemos romper la relación entre el banner y la imagen (ver método deleteImagen).
    //Pero tenemos que tener en cuenta que el objeto BannerHorizontal que tenemos en cliente (bannerHorizontal)
    //lo hemos recibido con la imagen actual o si no la tiene con null. Debemos "eliminar" también la imagen en cliente
    // (si la hubiera) para que al hacer una modificación no haya problemas de integridad relacional.
    this.bannerHorizontal.imagen = null;

    if(this.idImagen){

      this._imagenBannerService.deleteImagenBanner(this.idImagen).subscribe({

        next:(datos) => {}
        ,
        error:(error) => {

          this.datosModal.titulo = "Eliminar imagen banner horizontal";
          this.datosModal.status = error.status; //500...
          this.datosModal.mensaje = error.error.mensaje;
          this.datosModal.origen = "banner-h";
          this.modalAdmin.showModal();
        }
        ,
        complete: () => {this.sustituirImagen();}//Reseteamos los controles, input etc.
      });

    }





  }


  sustituirImagen():void{


    this.inputImagen.nativeElement.value=""; //Vaciamos el input
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.value; //Vaciamos imagenesSeleccionadas
    this.imagePreview = null;
    this.labelElegirImagen = "ELEGIR IMAGEN";


  }


  onImagenSelected( event: Event ):void{
    //Guardamos provisionalmente las imagenes seleccionadas sin enviarlas al servidor
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.files;
    const file = this.imagenesSeleccionadas[0];

    /* const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; */

    if (file && file.type.startsWith('image/jpeg')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>.
      this.labelElegirImagen = "IMAGEN SELECCIONADA";

    }else {
      this.imagePreview = null; // Si no es una imagen reseteamos la variable
    }

  }




  uploadImagen(id:number):void{

    //Si se ha seleccionado la imagen procedemos a subirla físicamente al servidor. El servicio de la API se encarga de añadirla en la BBDD
    if(this.imagenesSeleccionadas[0]){

        const formData:FormData = new FormData();

        //"imagen" es SUPER IMPORTANTE!!!. El nombre de este argumento tiene que coincidir
        //con el definido en el end-point de la Api
        //@PostMapping("/imagen-banner/{idBanner}")
	      //public ResponseEntity<?> uploadImagen(@RequestParam("imagen") MultipartFile multipartFile, @PathVariable Long idBanner) {

        formData.append("imagen",this.imagenesSeleccionadas[0]);

        this._imagenBannerService.uploadImagenBanner(formData,id).subscribe({

          next: (datos)=>{

            //En datos nos llega la url de la imagen (ver API)
            //this.urlImagen = datos.url;

          }
          ,
          error: (error)=>{
            this.datosModal.mensaje = "El banner se subió correctamente pero la subida de la imagen ha fallado";
            this.modalAdmin.showModal();
          }
          ,
          complete: ()=>{

            this.modalAdmin.showModal();
          }

        });


    }

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


