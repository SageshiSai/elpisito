import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Imagen } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private _http:HttpClient = inject(HttpClient);

  //MÉTODOS STORAGE DE IMAGEN

  uploadImagen(formData:FormData,id:number):Observable<any>{

    return this._http.post(GLOBAL.url_imagen + id, formData);
  }


  deleteImagen(id:number):Observable<any>{

    return this._http.delete(GLOBAL.url_imagen + id);

  }


  getImagenesPorInmueble(id:number):Observable<Imagen[]>{

    return this._http.get<Imagen[]>(GLOBAL.url_media + "imagenes/" + id);

  }


  

  //MÉTODOS COMUNES DE IMAGEN

    getImagenes():Observable<Imagen[]>{
  
      return this._http.get<Imagen[]>(GLOBAL.url + "imagenes");
  
    }

    getImagen(id:number):Observable<Imagen>{
  
      return this._http.get<Imagen>(GLOBAL.url + "imagen/" + id);
    }
  
  
    addImagen(imagen:Imagen):Observable<Imagen>{
  
      return this._http.post<Imagen>(GLOBAL.url + "imagen",imagen);
    }
  
    updateImagen(imagen:Imagen):Observable<Imagen>{
  
      return this._http.put<Imagen>(GLOBAL.url + "imagen",imagen);
    }
  
  
 
}
