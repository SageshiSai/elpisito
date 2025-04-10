import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreElPisitoComponent } from './sobre-el-pisito/sobre-el-pisito.component';
import { ContactarComponent } from './contactar/contactar.component';
import { MapaWebComponent } from './mapa-web/mapa-web.component';
import { PublicaAnuncioComponent } from './publica-anuncio/publica-anuncio.component';
import { ConsultaHipotecaComponent } from './consulta-hipoteca/consulta-hipoteca.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ErrorComponent } from './error/error.component';
import { DetailInmuebleComponent } from './detail-inmueble/detail-inmueble.component';

export const CONTENT_ROUTES: Routes = [

    {
        path:'',
        component:HomeComponent
    }
    ,
    
    {
        path:'home',
        component:HomeComponent
    }
    ,
    {
        path:'detail-inmueble/:id',
        component:DetailInmuebleComponent
    }
    ,
    
    {
        path:'sobre-el-pisito',
        component:SobreElPisitoComponent
    }
    ,
    
    {
        path:'contactar',
        component:ContactarComponent
    }
    ,
    
    {
        path:'mapa-web',
        component:MapaWebComponent
    }
    ,
    
    {
        path:'publica-anuncio',
        component:PublicaAnuncioComponent
    }
    ,
    
    {
        path:'consulta-hipoteca',
        component:ConsultaHipotecaComponent
    }
    ,
    
    {
        path:'servicios',
        component:ServiciosComponent
    }
    ,
    
    {
        path:'error',
        component:ErrorComponent
    }

    



];