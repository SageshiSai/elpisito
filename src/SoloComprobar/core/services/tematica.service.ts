import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tematica } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class TematicaService {

  private _http:HttpClient = inject(HttpClient);


  getTematicas():Observable<Tematica[]>{

    return this._http.get<Tematica[]>(GLOBAL.url + "tematicas");

  }

  getTematicasActivas():Observable<Tematica[]>{

    return this._http.get<Tematica[]>(GLOBAL.url + "tematicas-activas");

  }

  getTematica(id:number):Observable<Tematica>{

    return this._http.get<Tematica>(GLOBAL.url + "tematica/" + id);
  }



  addTematica(tematica:Tematica):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "tematica",tematica);
  }

  updateTematica(tematica:Tematica):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "tematica",tematica);
  }



}
