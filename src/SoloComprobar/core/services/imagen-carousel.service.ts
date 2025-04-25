import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ImagenCarouselService {


  private _http:HttpClient = inject(HttpClient);

  //MÉTODOS STORAGE DE IMAGEN CAROUSEL

      uploadImagenCarousel(formData:FormData,id:number):Observable<any>{

        return this._http.post(GLOBAL.url_imagen_carousel + id, formData);
      }


      deleteImagenCarousel(id:number):Observable<any>{

        return this._http.delete(GLOBAL.url_imagen_carousel + id);

      }


}
