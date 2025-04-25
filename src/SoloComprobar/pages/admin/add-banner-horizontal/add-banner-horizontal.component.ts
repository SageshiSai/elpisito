import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { BannerService } from '../../../core/services/banner.service';
import { FormsModule } from '@angular/forms';
import { ModalData } from '../../../core/models/auxiliars';
import { BannerHorizontal } from '../../../core/models/entities';

import { ImagenBannerService } from '../../../core/services/imagen-banner.service';



@Component({
  selector: 'app-add-banner-horizontal',
  imports: [FormsModule, ModalAdminComponent],
  templateUrl: './add-banner-horizontal.component.html',
  styleUrl: './add-banner-horizontal.component.css'
})
export class AddBannerHorizontalComponent {

  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  @ViewChild('imagen') inputImagen:ElementRef;


  private _bannerService:BannerService = inject(BannerService);
  private _imagenBannerService:ImagenBannerService = inject(ImagenBannerService);


  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview: string | ArrayBuffer | null = null;
  labelElegirImagen:string = "ELEGIR IMAGEN";
  id:number;

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  bannerHorizontal:BannerHorizontal={

    titular:"",
    claim:"",
    link:"",
    textoLink:"",
    altImagen:"",
    home:0,
    consultaHipotecas:0,
    detailInmueble:0,
    servicios:0,
    listInmuebleFinder:0,

  }


  add():void{


    //CONVERTIMOS LOS BOOLEAN DE LOS CHECKS EN NUMBER
    this.bannerHorizontal.home = Number(this.bannerHorizontal.home);
    this.bannerHorizontal.consultaHipotecas = Number(this.bannerHorizontal.consultaHipotecas);
    this.bannerHorizontal.detailInmueble = Number(this.bannerHorizontal.detailInmueble);
    this.bannerHorizontal.servicios = Number(this.bannerHorizontal.servicios);
    this.bannerHorizontal.listInmuebleFinder = Number(this.bannerHorizontal.listInmuebleFinder);

    this._bannerService.addBannerHorizontal(this.bannerHorizontal).subscribe({

      next: (datos) => {
   
        //En datos.bannerHorizontal (ver response de la API) están los datos del banner horizontal recién creado
        this.id = datos.banner_horizontal.id; //recogemos el id del banner horizontal recién creado para crear la imagen del banner


        this.datosModal.titulo = "+Banner horizontal";
        this.datosModal.status = "201";
        this.datosModal.origen = "banner-h";
        
        if(this.imagenesSeleccionadas){
          this.datosModal.mensaje = datos.mensaje+ ". La imagen del banner ha sido subida al servidor";
        }else{
          this.datosModal.mensaje = datos.mensaje + ". La imagen del banner no ha sido incluída. Puede subirla mas tarde desde el panel de administración";
          this.modalAdmin.showModal();
        }

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "+Banner horizontal";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje + ". La imagen no se ha subido al servidor.";
        this.datosModal.origen = "banner-h";
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
        this.imagePreview = reader.result; //Asignamos, por referencia, la propiedad result del reader a una variable más manejable.
        //Cualquier modificación que hagamos a partir de ahora en el objeto reader "afectará" a this.imagePreview (no olvidemos que es el mismo objeto)
      };

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>. La imagen se renderiza en el thumbnail de imagen (this.imagePreview)

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
            //console.log(error);
            this.datosModal.titulo = "+Banner horizontal";
            this.datosModal.status = error.status; //400,403...
            this.datosModal.mensaje = error.error.mensaje + ". El banner se subió correctamente pero la subida de la imagen ha fallado";
            this.datosModal.origen = "banner-h";

            this.modalAdmin.showModal();
          }
          ,
          complete: ()=>{

            this.modalAdmin.showModal();
          }

        });


    }

  }

}
