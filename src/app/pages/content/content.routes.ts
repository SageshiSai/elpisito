import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ElPisitoComponent } from './el-pisito/el-pisito.component';
import { ContactarComponent } from './contactar/contactar.component';
import { MapaWebComponent } from './mapa-web/mapa-web.component';
import { PublicaAnuncioComponent } from './publica-anuncio/publica-anuncio.component';
import { ConsultaHipotecaComponent } from './consulta-hipoteca/consulta-hipoteca.component';
import { ServiciosComponent } from './servicios/servicios.component';

export const CONTENT_ROUTES: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: ElPisitoComponent
  },
  {
    path: 'contact',
    component: ContactarComponent
  },
  {
    path: 'mapa-web',
    component: MapaWebComponent
  },
  {
    path: 'publica-tu-anuncio',
    component: PublicaAnuncioComponent
  },
  {
    path: 'consulta-hipoteca',
    component: ConsultaHipotecaComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  }

];