import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BannerCarousel, BannerHorizontal, Tematica } from '../models/entities';
import { Observable } from 'rxjs';
import { GLOBAL } from '../environments/global';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private _http:HttpClient = inject(HttpClient);

  //BANNER HORIZONTAL
  
  
    getBannersHorizontales():Observable<BannerHorizontal[]>{
  
      return this._http.get<BannerHorizontal[]>(GLOBAL.url + "banners-h");
  
    }

    getBannersHorizontalesActivos():Observable<BannerHorizontal[]>{


      return this._http.get<BannerHorizontal[]>(GLOBAL.url + "banners-h-activos");
   
  
    }

    getBannersHorizontalesActivosHome():Observable<BannerHorizontal[]>{


      return this._http.get<BannerHorizontal[]>(GLOBAL.url + "banners-h-activos-home");
   
  
    }

    getBannerHorizontal(id:number):Observable<BannerHorizontal>{
  
      return this._http.get<BannerHorizontal>(GLOBAL.url + "banner-h/" + id);
    }

  
    addBannerHorizontal(banner:BannerHorizontal):Observable<any>{
  
      return this._http.post<any>(GLOBAL.url + "banner-h",banner);
    }
  
    updateBannerHorizontal(banner:BannerHorizontal):Observable<any>{
  
      return this._http.put<any>(GLOBAL.url + "banner-h",banner);
    }
  



  //BANNER CAROUSEL

  getBannersCarousel():Observable<BannerCarousel[]>{


    return this._http.get<BannerCarousel[]>(GLOBAL.url + "banners-c");
 

  }

  getBannersCarouselActivos():Observable<BannerCarousel[]>{


    return this._http.get<BannerCarousel[]>(GLOBAL.url + "banners-c-activos");
 

  }


  getBannersCarouselActivosTematica(idTematica:number):Observable<BannerCarousel[]>{


    return this._http.get<BannerCarousel[]>(GLOBAL.url + "banners-c-activos-tematica/" + idTematica);
 

  }


  
    addBannerCarousel(banner:BannerCarousel):Observable<any>{
  
      return this._http.post<any>(GLOBAL.url + "banner-c",banner);
    }
  
    updateBannerCarousel(banner:BannerCarousel):Observable<any>{
  
      return this._http.put<any>(GLOBAL.url + "banner-c",banner);
    }
  
  
    getBannerCarousel(id:number):Observable<BannerCarousel>{
  
      return this._http.get<BannerCarousel>(GLOBAL.url + "banner-c/" + id);
    }





}
