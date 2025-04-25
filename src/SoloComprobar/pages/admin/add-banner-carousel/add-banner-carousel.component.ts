import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { BannerService } from '../../../core/services/banner.service';
import { ImagenCarouselService } from '../../../core/services/imagen-carousel.service';
import { ModalData } from '../../../core/models/auxiliars';
import { BannerCarousel, Tematica } from '../../../core/models/entities';
import { NgClass } from '@angular/common';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { TematicaService } from '../../../core/services/tematica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-banner-carousel',
  imports: [FormsModule, ModalAdminComponent, PreloaderComponent,NgClass],
  templateUrl: './add-banner-carousel.component.html',
  styleUrl: './add-banner-carousel.component.css'
})
export class AddBannerCarouselComponent implements OnInit {

  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////


  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  @ViewChild('imagen') inputImagen:ElementRef;


  private _bannerService:BannerService = inject(BannerService);
  private _tematicaService:TematicaService = inject(TematicaService);
  private _imagenCarouselService:ImagenCarouselService = inject(ImagenCarouselService);
  private _router:Router = inject(Router);


  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview: string | ArrayBuffer | null = null;
  labelElegirImagen:string = "ELEGIR IMAGEN";
  id:number;
  aTematicas:Array<Tematica> = [];

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  bannerCarousel:BannerCarousel={

    altImagen:"",
    titular:"",
    claim:"",
    tematica:{tematica:""},

  }


  ngOnInit(): void {
    this.getDatos();
  }



  getDatos():void{

    this._tematicaService.getTematicas().subscribe({

      next: (datos) => {
        this.aTematicas = datos;

      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {this.faseCarga() }
    });



  }


  add():void{


    this._bannerService.addBannerCarousel(this.bannerCarousel).subscribe({

      next: (datos) => {

        //En datos.banner_carousel (ver response de la API) están los datos del banner carousel recién creado
        this.id = datos.banner_carousel.id; //recogemos el id del banner carousel recién creado para crear la imagen del banner


        this.datosModal.titulo = "+Banner carousel";
        this.datosModal.status = "201";
        this.datosModal.origen = "banner-c";

        if(this.imagenesSeleccionadas){
          this.datosModal.mensaje = datos.mensaje+ ". La imagen del banner ha sido subida al servidor";
        }else{
          this.datosModal.mensaje = datos.mensaje + ". La imagen del banner no ha sido incluída. Puede subirla mas tarde desde el panel de administración";
          this.modalAdmin.showModal();
        }

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "+Banner carousel";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje + ". La imagen no se ha subido al servidor.";
        this.datosModal.origen = "banner-c";
        this.modalAdmin.showModal();


      }
      ,
      complete: () => {

         if(this.imagenesSeleccionadas[0]){ //Si se ha seleccionado la imagen
          this.uploadImagen(this.id);
        }

      }
    });


  }

  sustituirImagen():void{ //...cuando ya la has elegido y te arrepientes...y quieres poner otra antes de crearla


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

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>. La imagen se renderiza en el thumbnail de imagen

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
        //@PostMapping("/imagen-carousel/{idBanner}")
	      //public ResponseEntity<?> uploadImagen(@RequestParam("imagen") MultipartFile multipartFile, @PathVariable Long idBanner) {

        formData.append("imagen",this.imagenesSeleccionadas[0]);

        this._imagenCarouselService.uploadImagenCarousel(formData,id).subscribe({

          next: (datos)=>{

            //En datos nos llega la url de la imagen (ver API)
            //this.urlImagen = datos.url;

          }
          ,
          error: (error)=>{
            //console.log(error);
            this.datosModal.titulo = "+Banner carousel";
            this.datosModal.status = error.status; //400,403...
            this.datosModal.mensaje = error.error.mensaje + ". El banner se subió correctamente pero la subida de la imagen ha fallado";
            this.datosModal.origen = "banner-c";

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
