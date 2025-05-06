import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Inmueble } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {


  private _http:HttpClient=inject(HttpClient);



  getInmuebles():Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(GLOBAL.url + "inmuebles");

  }


  getInmueblesActivos():Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(GLOBAL.url + "inmuebles-activos");

  }

  /* PARA LA VENTA DESDE EL BUSCADOR */
  getInmueblesFinder(tipo:number, poblacion:number, operacion:string):Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(GLOBAL.url + "inmuebles/" + tipo + "/" + poblacion + "/" + operacion);

  }



  getInmueblesPortada():Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(GLOBAL.url + "inmuebles-portada");

  }


  getInmueble(id:number):Observable<Inmueble>{

    return this._http.get<Inmueble>(GLOBAL.url + "inmueble/" + id);


  }


  addInmueble(inmueble:Inmueble):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "inmueble",inmueble);
  }


  updateInmueble(inmueble:Inmueble):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "inmueble",inmueble);
  }






}
