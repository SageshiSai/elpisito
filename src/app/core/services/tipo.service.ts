import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tipo } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private _http:HttpClient = inject(HttpClient);


  getTipos():Observable<Tipo[]>{

    return this._http.get<Tipo[]>(GLOBAL.url + "tipos");

  }

  getTiposActivos():Observable<Tipo[]>{

    return this._http.get<Tipo[]>(GLOBAL.url + "tipos-activos");

  }

  getTipo(id:number):Observable<Tipo>{

    return this._http.get<Tipo>(GLOBAL.url + "tipo/" + id);
  }



  addTipo(tipo:Tipo):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "tipo",tipo);
  }

  updateTipo(tipo:Tipo):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "tipo",tipo);
  }


}
