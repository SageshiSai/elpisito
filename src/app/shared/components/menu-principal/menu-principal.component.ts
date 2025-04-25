import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ComunicacionService } from '../../../core/services/comunicacion.service';

@Component({
  selector: 'app-menu-principal',
  imports: [RouterLink],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit, OnDestroy{


  isLogged:boolean;
  suscripcion:Subscription;
  usuario:string;
  rol:string;

  private _authService:AuthService = inject(AuthService);
  private _router:Router = inject(Router);
  private _comunicacionService:ComunicacionService = inject(ComunicacionService);

  ngOnInit(): void {
    this.suscripcion = this._comunicacionService.logueo$.subscribe({

      next: (datos) => {

        this.isLogged = datos;
        if(this.isLogged){
          this.usuario = this._authService.getUsuario();
          this.rol = this._authService.getRol();
        }


      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {}
    });
  }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


  logout():void{

    this._authService.logout();
    this._comunicacionService.cambioLogueo(false);
    this._router.navigate(["/"]);
    this.usuario="";
    this.rol ="";

  }




}
