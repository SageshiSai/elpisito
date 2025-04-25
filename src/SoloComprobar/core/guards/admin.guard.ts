import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ComunicacionService } from '../services/comunicacion.service';

export const adminGuard: CanActivateFn = (route, state) => {
 

  //Recordamos que no estamos dentro una clase (ni siquiera es un método...)
  //Es una función. Por lo tanto no tenemos cosntructor.

  const _router:Router = inject(Router);
  const _authService:AuthService = inject(AuthService);
  const _comunicacionService:ComunicacionService = inject(ComunicacionService);


  if(_authService.isLoggedIn() && _authService.getRol() == "admin"){

    return true;

  }else{

    _comunicacionService.cambioLogueo(false);
    _router.navigate(["/auth/login"]);
    return false;
    
  }
};
