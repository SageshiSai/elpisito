import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/content/content.routes').then( m => m.CONTENT_ROUTES )
  }

];
