import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let _authService = inject(AuthService);
  const token = _authService.getToken();

  if(token){//Si hay token vamos a añadirlo en el encabezado de la petición. Pero no podemos modificar un objeto req PORQUE SON OBJETOS INMUTABLES!!!
    //Un clone no es una copia por referencia sino que es una copia INDEPENDIENTE
    const cloneRequest = req.clone({

      headers: req.headers.append('Authorization',`Bearer ${token}`)
      /* setHeaders:{
        Authorization: `Bearer ${token}`,
      } */
    });

    return next(cloneRequest);

  }else{

    return next(req);

  }



};
