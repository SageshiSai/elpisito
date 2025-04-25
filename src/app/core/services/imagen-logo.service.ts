import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ImagenLogoService {


  private _http:HttpClient = inject(HttpClient);

  //MÉTODOS STORAGE DE IMAGEN LOGO

    uploadImagenLogo(formData:FormData,id:number):Observable<any>{

      return this._http.post(GLOBAL.url_imagen_logo_inmobiliaria + id, formData);
    }


      deleteImagenLogo(id:number):Observable<any>{

      return this._http.delete(GLOBAL.url_imagen_logo_inmobiliaria + id);

    }

}
