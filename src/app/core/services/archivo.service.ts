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

  //MÉTODOS STORAGE DE ARCHIVO

    uploadArchivo(formData:FormData,id:number):Observable<any>{
  
      return this._http.post(GLOBAL.url_archivo + id, formData);
    }
  
  
    deleteArchivo(id:number):Observable<any>{
  
      return this._http.delete(GLOBAL.url_archivo + id);
  
    }
  
  
    getArchivosPorInmueble(id:number):Observable<Archivo[]>{
  
      return this._http.get<Archivo[]>(GLOBAL.url_media + "archivos/" + id);
  
    }






  //MÉTODOS COMUNES DE ARCHIVO

    getArchivos():Observable<Archivo[]>{

      return this._http.get<Archivo[]>(GLOBAL.url + "archivos");

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
