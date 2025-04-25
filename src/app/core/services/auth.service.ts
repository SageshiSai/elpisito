import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../models/entities';
import { Observable } from 'rxjs';
import { URL_BASE } from '../environments/global';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayLoad } from '../models/auxiliars';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http:HttpClient = inject(HttpClient);
  private _router:Router = inject(Router);

  token:string|null;

  login(credenciales:Credentials):Observable<any>{

    return this._http.post<any>(URL_BASE + "authenticate",credenciales);
  }


  logout():void{

    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
    }

  }

  //Este método controla si el usuario está logueado (existe token legal y activo)
  //o no está logueado (no existe token o está expirado)
  isLoggedIn():boolean{

    let decoded:CustomJwtPayLoad;
    this.token = this.getToken();
    let currentTime = Math.floor(Date.now()/1000);

    if(!this.token){

      return false;

    }

    try{

      decoded = jwtDecode(this.token);
      //Si hay un error en el "decode" puede ser debido a que se ha intentado modificar 
      //el token en local...entre otras muchas cosas...

    }catch(error){

      return false;

    }

    //Si llegamos aquí: tenemos token y lo hemos podido decodificar
    //Ahora vamos a comprobar si el token es válido en cuanto a fecha
    if(decoded.exp && decoded.exp > currentTime){
      return true;
    }else{
      return false;
    }

    

  }


  getToken():string|null{

      return localStorage.getItem("token");
  }


  setTokenInLocalStorage(token:string):void{

    //Si existe otro token (caducado etc.) bórralo!!!
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
    }

    //Una vez borrado seteamos el nuevo token
    localStorage.setItem("token",token);


  }


  //Vamos a conseguir el usuario del payload del token
  //decodificándolo primero
  getUsuario():string{

    this.token = this.getToken();   
    const decoded:CustomJwtPayLoad = jwtDecode(this.token!);
    return decoded.usuario;  

    }




  //Vamos a conseguir el rol del payload del token
  //decodificándolo primero
  getRol():string{

    this.token = this.getToken();
    const decoded:CustomJwtPayLoad = jwtDecode(this.token!);

      let rol = decoded.ROLES;

      if(rol == "[ROLE_USER]"){
        rol = "user";
      }else if (rol =="[ROLE_ADMIN]"){
        rol = "admin";
      }else if (rol =="[ROLE_ADMIN_PLUS]"){
        rol = "admin_plus";
      }else if (rol =="[INMOBILIARIA]"){
        rol = "inmobiliaria";
      }

      return rol;

  
  }


}
