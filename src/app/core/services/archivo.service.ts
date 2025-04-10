import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';
import { Archivo } from '../models/entities';


@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  private _http:HttpClient = inject(HttpClient);

  //MÉTODOS COMUNES DE ARCHIVO

    getArchivos():Observable<Archivo[]>{
  
      return this._http.get<Archivo[]>(GLOBAL.url + "archivos");
  
    }
  
    getArchivosActivos():Observable<Archivo[]>{
  
      return this._http.get<Archivo[]>(GLOBAL.url + "archivos-activos");
  
    }

    getArchivo(id:number):Observable<Archivo>{
  
      return this._http.get<Archivo>(GLOBAL.url + "archivo/" + id);
    }
  
  
    addArchivo(archivo:Archivo):Observable<Archivo>{
  
      return this._http.post<Archivo>(GLOBAL.url + "archivo",archivo);
    }
  
    updateArchivo(archivo:Archivo):Observable<Archivo>{
  
      return this._http.put<Archivo>(GLOBAL.url + "archivo",archivo);
    }
  
  
 


  //MÉTODOS STORAGE DE ARCHIVO

  getArchivoPorSuNombre(nombre:string):Observable<Blob>{

    return this._http.get<Blob>(GLOBAL.url_archivo + nombre, {responseType:'blob' as 'json'});   

  }
 
}
