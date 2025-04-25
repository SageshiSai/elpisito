import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ImagenBannerService {

    private _http:HttpClient = inject(HttpClient);

  //MÉTODOS STORAGE DE IMAGEN BANNER

  uploadImagenBanner(formData:FormData,id:number):Observable<any>{

    return this._http.post(GLOBAL.url_imagen_banner + id, formData);
  }


  deleteImagenBanner(id:number):Observable<any>{

    return this._http.delete(GLOBAL.url_imagen_banner + id);

  }

}
