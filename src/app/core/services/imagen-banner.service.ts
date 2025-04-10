import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenBannerService {

  private _http:HttpClient = inject(HttpClient);

  //MÉTODOS STORAGE DE IMAGEN BANNER

}
