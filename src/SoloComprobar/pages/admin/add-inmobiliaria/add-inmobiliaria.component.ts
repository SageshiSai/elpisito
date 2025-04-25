import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { InmobiliariaService } from '../../../core/services/inmobiliaria.service';
import { ImagenLogoService } from '../../../core/services/imagen-logo.service';
import { FormsModule } from '@angular/forms';
import { ModalData } from '../../../core/models/auxiliars';
import { Inmobiliaria } from '../../../core/models/entities';


@Component({
  selector: 'app-add-inmobiliaria',
  imports: [FormsModule, ModalAdminComponent],
  templateUrl: './add-inmobiliaria.component.html',
  styleUrl: './add-inmobiliaria.component.css'
})
export class AddInmobiliariaComponent {


  @ViewChild(ModalAdminComponent) modalAdmin:ModalAdminComponent;
  @ViewChild('imagen') inputImagen:ElementRef;


  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _imagenLogoService:ImagenLogoService = inject(ImagenLogoService);


  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview: string | ArrayBuffer | null = null;
  labelElegirImagen:string = "ELEGIR LOGO";
  id:number;

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  inmobiliaria:Inmobiliaria={

   nombre:"",
   representante:""


  }


  add():void{


    this._inmobiliariaService.addInmobiliaria(this.inmobiliaria).subscribe({

      next: (datos) => {

        //En datos.inmobiliaria (ver response de la API) están los datos de la inmobiliaria recién creada
        this.id = datos.inmobiliaria.id; //recogemos el id de la inmobiliaria recién creado para crear la imagen del logo


        this.datosModal.titulo = "+Inmobiliaria";
        this.datosModal.status = "201";
        this.datosModal.origen = "inmobiliaria";


        if(this.imagenesSeleccionadas){
          this.datosModal.mensaje = datos.mensaje + ". El logo de la inmobiliaria ha sido subida al servidor";
        }else{
          this.datosModal.mensaje = datos.mensaje + ". El logo de la inmobiliaria no ha sido incluído. Puede subirlo mas tarde desde el panel de administración";
          this.modalAdmin.showModal();
        }

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "+Inmobiliaria";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje + ". El logo de la inmobiliaria no se ha subido al servidor.";
        this.datosModal.origen = "inmobiliaria";
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
    this.labelElegirImagen = "ELEGIR LOGO";


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

      this.labelElegirImagen = "LOGO SELECCIONADO";

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
        //@PostMapping("/imagen-logo/{idInmobiliaria}")
	      //public ResponseEntity<?> uploadImagen(@RequestParam("imagen") MultipartFile multipartFile, @PathVariable Long idBanner) {

        formData.append("imagen",this.imagenesSeleccionadas[0]);

        this._imagenLogoService.uploadImagenLogo(formData,id).subscribe({

          next: (datos)=>{

            //En datos nos llega la url de la imagen (ver API)
            //this.urlImagen = datos.url;

          }
          ,
          error: (error)=>{
            //console.log(error);
            this.datosModal.titulo = "+Inmobiliaria";
            this.datosModal.status = error.status; //400,403...
            this.datosModal.mensaje = error.error.mensaje + ". La inmobiliaria se creó correctamente pero la subida de la imagen ha fallado";
            this.datosModal.origen = "inmobiliaria";

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
