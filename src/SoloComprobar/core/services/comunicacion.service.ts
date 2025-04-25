import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

 private _authService:AuthService = inject(AuthService);

  logueo = new BehaviorSubject<boolean>(this._authService.isLoggedIn());
  logueo$ = this.logueo.asObservable();

  cambioLogueo(estado:boolean){

    this.logueo.next(estado);
  }

}
