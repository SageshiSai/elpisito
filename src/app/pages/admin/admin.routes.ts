import { Routes } from '@angular/router';
import { AddTipoComponent } from './add-tipo/add-tipo.component';
import { ListTipoComponent } from './list-tipo/list-tipo.component';
import { EditTipoComponent } from './edit-tipo/edit-tipo.component';
import { AddProvinciaComponent } from './add-provincia/add-provincia.component';
import { ListProvinciaComponent } from './list-provincia/list-provincia.component';
import { EditProvinciaComponent } from './edit-provincia/edit-provincia.component';
import { AddPoblacionComponent } from './add-poblacion/add-poblacion.component';
import { ListPoblacionComponent } from './list-poblacion/list-poblacion.component';
import { EditPoblacionComponent } from './edit-poblacion/edit-poblacion.component';
import { AddTematicaComponent } from './add-tematica/add-tematica.component';
import { ListTematicaComponent } from './list-tematica/list-tematica.component';
import { EditTematicaComponent } from './edit-tematica/edit-tematica.component';
import { AddBannerHorizontalComponent } from './add-banner-horizontal/add-banner-horizontal.component';
import { ListBannerHorizontalComponent } from './list-banner-horizontal/list-banner-horizontal.component';
import { EditBannerHorizontalComponent } from './edit-banner-horizontal/edit-banner-horizontal.component';
import { AddInmobiliariaComponent } from './add-inmobiliaria/add-inmobiliaria.component';
import { ListInmobiliariaComponent } from './list-inmobiliaria/list-inmobiliaria.component';
import { EditInmobiliariaComponent } from './edit-inmobiliaria/edit-inmobiliaria.component';
import { AddBannerCarouselComponent } from './add-banner-carousel/add-banner-carousel.component';
import { ListBannerCarouselComponent } from './list-banner-carousel/list-banner-carousel.component';
import { EditBannerCarouselComponent } from './edit-banner-carousel/edit-banner-carousel.component';
import { AddInmuebleComponent } from './add-inmueble/add-inmueble.component';
import { EditInmuebleComponent } from './edit-inmueble/edit-inmueble.component';
import { EditImagenComponent } from './edit-imagen/edit-imagen.component';
import { EditArchivoComponent } from './edit-archivo/edit-archivo.component';
import { ListInmuebleComponent } from './list-inmueble/list-inmueble.component';

export const ADMIN_ROUTES: Routes = [


    {
        path:'add-tipo',
        component:AddTipoComponent
    }
    ,
    {
        path:'list-tipo',
        component:ListTipoComponent
    }
    ,
    {
        path:'edit-tipo/:id',
        component:EditTipoComponent
    }
    ,
    {
        path:'add-provincia',
        component:AddProvinciaComponent
    }
    ,
    {
        path:'list-provincia',
        component:ListProvinciaComponent
    }
    ,
    {
        path:'edit-provincia/:id',
        component:EditProvinciaComponent
    }
    ,
    {
        path:'add-poblacion',
        component:AddPoblacionComponent
    }
    ,
    {
        path:'list-poblacion',
        component:ListPoblacionComponent
    }
    ,
    {
        path:'edit-poblacion/:id',
        component:EditPoblacionComponent
    }
    ,
    {
        path:'add-tematica',
        component:AddTematicaComponent
    }
    ,
    {
        path:'list-tematica',
        component:ListTematicaComponent
    }
    ,
    {
        path:'edit-tematica/:id',
        component:EditTematicaComponent
    }
    ,
    {
        path:'add-banner-h',
        component:AddBannerHorizontalComponent
    }
    ,
    {
        path:'list-banner-h',
        component:ListBannerHorizontalComponent
    }
    ,
    {
        path:'edit-banner-h/:id',
        component:EditBannerHorizontalComponent
    }
    ,
    {
        path:'add-inmobiliaria',
        component:AddInmobiliariaComponent
    }
    ,
    {
        path:'list-inmobiliaria',
        component:ListInmobiliariaComponent
    }
    ,
    {
        path:'edit-inmobiliaria/:id',
        component:EditInmobiliariaComponent
    }
    ,
    {
        path:'add-banner-c',
        component:AddBannerCarouselComponent
    }
    ,
    {
        path:'list-banner-c',
        component:ListBannerCarouselComponent
    }
    ,
    {
        path:'edit-banner-c/:id',
        component:EditBannerCarouselComponent
    }
    ,
    {
        path:'add-inmueble',
        component:AddInmuebleComponent
    }
    ,
    {
        path:'list-inmueble',
        component:ListInmuebleComponent
    }
    ,
    {
        path:'edit-inmueble/:id',
        component:EditInmuebleComponent
    }

    ,
    {
        path:'edit-imagen/:id',
        component:EditImagenComponent
    }
    ,
    {
        path:'edit-archivo/:id',
        component:EditArchivoComponent
    }




];
