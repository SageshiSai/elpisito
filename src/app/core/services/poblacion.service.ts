import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Poblacion } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class PoblacionService {

  private _http:HttpClient = inject(HttpClient);


  getPoblaciones():Observable<Poblacion[]>{

    return this._http.get<Poblacion[]>(GLOBAL.url + "poblacion");

  }

  getPoblacionesActivas():Observable<Poblacion[]>{

    return this._http.get<Poblacion[]>(GLOBAL.url + "poblaciones-activas");

  }

  getPoblacion(id:number):Observable<Poblacion>{

    return this._http.get<Poblacion>(GLOBAL.url + "poblacion/" + id);
  }



  addPoblacion(poblacion:Poblacion):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "poblacion",poblacion);
  }

  updatePoblacion(poblacion:Poblacion):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "poblacion",poblacion);
  }

  
}
