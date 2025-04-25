import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/entities';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private _http:HttpClient = inject(HttpClient);


  getProvincias():Observable<Provincia[]>{

    return this._http.get<Provincia[]>(GLOBAL.url + "provincias");

  }

  getProvinciasActivas():Observable<Provincia[]>{

    return this._http.get<Provincia[]>(GLOBAL.url + "provincias-activas");

  }


  addProvincia(provincia:Provincia):Observable<any>{

    return this._http.post<any>(GLOBAL.url + "provincia",provincia);
  }

  updateProvincia(provincia:Provincia):Observable<any>{

    return this._http.put<any>(GLOBAL.url + "provincia",provincia);
  }


  getProvincia(id:number):Observable<Provincia>{

    return this._http.get<Provincia>(GLOBAL.url + "provincia/" + id);
  }
}
