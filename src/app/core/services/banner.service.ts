import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerHorizontal } from '../models/entities';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private _http: HttpClient
  ) {}

  getBannersHorizontalesActivosHome(): Observable<BannerHorizontal[]>{
    return this._http.get<BannerHorizontal[]>(`${GLOBAL.url}banners-h-activos-home`);
  }
}
