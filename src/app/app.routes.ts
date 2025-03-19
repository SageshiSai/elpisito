import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/content/error/error.component';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/content/content.routes').then( m => m.CONTENT_ROUTES )
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then( m => m.AUTH_ROUTES )
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then( m => m.ADMIN_ROUTES )
  },
  {
    path: '**',
    component: ErrorComponent
    /** Esta ruta siempre tiene que estar en la ultima posicion */
  }

];
