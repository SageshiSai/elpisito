import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/entities';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _http:HttpClient = inject(HttpClient);


  getUsuarios():Observable<Usuario[]>{

    return this._http.get<Usuario[]>(GLOBAL.url + "usuarios");

  }

  getUsuariosActivos():Observable<Usuario[]>{

    return this._http.get<Usuario[]>(GLOBAL.url + "usuarios-activos");

  }

  getUsuario(id:number):Observable<Usuario>{

    return this._http.get<Usuario>(GLOBAL.url + "usuario/" + id);
  }



  addUsuario(usuario:Usuario):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "usuario",usuario);
  }

  updateUsuario(usuario:Usuario):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "usuario",usuario);
  }

}
