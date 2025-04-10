import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Inmobiliaria } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class InmobiliariaService {

  private _http:HttpClient = inject(HttpClient);


  getInmobiliarias():Observable<Inmobiliaria[]>{

    return this._http.get<Inmobiliaria[]>(GLOBAL.url + "inmobiliarias");

  }

  getInmobiliariasActivas():Observable<Inmobiliaria[]>{

    return this._http.get<Inmobiliaria[]>(GLOBAL.url + "inmobiliarias-activas");

  }

  getInmobiliaria(id:number):Observable<Inmobiliaria>{

    return this._http.get<Inmobiliaria>(GLOBAL.url + "inmobiliaria/" + id);
  }



  addInmobiliaria(inmobiliaria:Inmobiliaria):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "inmobiliaria",inmobiliaria);
  }

  updateInmobiliaria(inmobiliaria:Inmobiliaria):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "inmobiliaria",inmobiliaria);
  }
}
