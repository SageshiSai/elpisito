import { Component, inject, ViewChild } from '@angular/core';
import { ModalAdminComponent } from '../../../shared/components/modal-admin/modal-admin.component';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import { Usuario } from '../../../core/models/entities';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalUsuarioComponent } from '../../../shared/components/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-add-usuario',
  imports: [ModalUsuarioComponent,ReactiveFormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {


  @ViewChild(ModalUsuarioComponent) modalUsuario:ModalUsuarioComponent;
  

  private _usuarioService:UsuarioService = inject(UsuarioService);
  private _router:Router = inject(Router);

  datosModal:ModalData={

    titulo:"",
    status:"",
    mensaje:"",
    origen:""

  };

  usuario:Usuario={

    email:"",
    password:"",
    user:"",

  }

  registerForm:FormGroup = new FormGroup({

      elEmail: new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")])    //REGEX
      ,
      elPassword: new FormControl('',[Validators.required])
      ,
      elUsuario: new FormControl('',[Validators.required])

  });








  register():void{

    if( this.registerForm.valid){

      this.usuario.email = this.registerForm.get("elEmail")?.value || "";
      this.usuario.password = this.registerForm.get("elPassword")?.value || "";
      this.usuario.user = this.registerForm.get("elUsuario")?.value || "";


    }  

    this._usuarioService.addUsuario(this.usuario).subscribe({

      next: (datos) => {

        this.datosModal.titulo = "+Usuario";
        this.datosModal.status = "201";
        this.datosModal.mensaje = datos.mensaje;
        this.datosModal.origen = "registro";   
        this.modalUsuario.showModal();


      } //Devuelve el objeto creado
      ,
      error: (error) => {
    

        this.datosModal.titulo = "+Usuario";
        this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        this.datosModal.origen = "registro";         
        this.modalUsuario.showModal();


      }
      ,
      complete: () => {}
    });

    
  }


}
