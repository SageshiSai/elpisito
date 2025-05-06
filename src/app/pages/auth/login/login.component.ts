import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '../../../core/models/entities';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComunicacionService } from '../../../core/services/comunicacion.service';
import { ModalUsuarioComponent } from '../../../shared/components/modal-usuario/modal-usuario.component';
import { ModalData } from '../../../core/models/auxiliars';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,ModalUsuarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild(ModalUsuarioComponent) modalUsuario:ModalUsuarioComponent;

  private _authService:AuthService = inject(AuthService);
  private _router:Router = inject(Router);
  private _comunicacionService:ComunicacionService = inject(ComunicacionService);

  credenciales:Credentials = {

    username:"", //en realidad es el email
    password:"",

  }

   datosModal:ModalData={

      titulo:"",
      status:"",
      mensaje:"",
      origen:""

    };


  loginForm = new FormGroup({

    elEmail:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]), //REGEX
    elPassword: new FormControl('',[Validators.required])


  });


  login():void{

    /* console.log("entro"); */
    if(this.loginForm.valid){

      this.credenciales.username = this.loginForm.get("elEmail")?.value || "";
      this.credenciales.password = this.loginForm.get("elPassword")?.value || "";
    }


    this._authService.login(this.credenciales).subscribe({

      next: (response) => {

        /* console.log(response); */
        /*{jwt: "eyJhbGciOiJIUzI1NiJ9.eyJST0xFUyI6IltST0xFX1VTRVJdIiwidXN1YXJpbyI6ImphaW1pdG8iLCJpZCI6Niwic3ViIjoiamFpbWl0b0BnbWFpbC5jb20iLCJpYXQiOjE3NDU0ODQ1MjQsImV4cCI6MTc0NTQ4NTcyNH0.hUz8Ms4fP8kmACt4gDLtkbVIUqXewOEq6Zy_jsM0R2M",
          message: "jaimito@gmail.com, te has logueado correctamente",
          messageTitle:"Login realizado con éxito!!!",
          } */

          this._authService.setTokenInLocalStorage(response.jwt);
          this._comunicacionService.cambioLogueo(true);
          this._comunicacionService.cambioPortada(!this._authService.isLoggedIn() ||  (this._authService.isLoggedIn() && this._authService.getRol() == "user"));



          this.datosModal.titulo = "Login";
          this.datosModal.status = "201";
          this.datosModal.mensaje = response.messageTitle;
          this.datosModal.origen = "login";
          this.modalUsuario.showModal();

      }
      ,
      error: (error) => {

          this.datosModal.titulo = "Login";
          this.datosModal.status = error.status; //400,403...
          this.datosModal.mensaje = "Credenciales incorrectas";
          this.datosModal.origen = "login";
          this.modalUsuario.showModal();


      }
      ,
      complete: () => {}

    });

  }


}
