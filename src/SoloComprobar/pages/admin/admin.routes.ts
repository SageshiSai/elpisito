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
import { adminOrAdminPlusGuard } from '../../core/guards/admin-or-admin-plus.guard';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { adminPlusGuard } from '../../core/guards/admin-plus.guard';

export const ADMIN_ROUTES: Routes = [

   
    {
        path:'add-usuario',
        component:AddUsuarioComponent,
        canActivate:[adminPlusGuard]
    }
    ,
    {
        path:'list-usuario',
        component:ListUsuarioComponent,
        canActivate:[adminPlusGuard]
    }
    ,
    {
        path:'edit-usuario/:id',
        component:EditUsuarioComponent,
        canActivate:[adminPlusGuard]
    }
    ,

    {
        path:'add-tipo',
        component:AddTipoComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-tipo',
        component:ListTipoComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-tipo/:id',
        component:EditTipoComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-provincia',
        component:AddProvinciaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-provincia',
        component:ListProvinciaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-provincia/:id',
        component:EditProvinciaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-poblacion',
        component:AddPoblacionComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-poblacion',
        component:ListPoblacionComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-poblacion/:id',
        component:EditPoblacionComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-tematica',
        component:AddTematicaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-tematica',
        component:ListTematicaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-tematica/:id',
        component:EditTematicaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-banner-h',
        component:AddBannerHorizontalComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-banner-h',
        component:ListBannerHorizontalComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-banner-h/:id',
        component:EditBannerHorizontalComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-inmobiliaria',
        component:AddInmobiliariaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-inmobiliaria',
        component:ListInmobiliariaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-inmobiliaria/:id',
        component:EditInmobiliariaComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-banner-c',
        component:AddBannerCarouselComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-banner-c',
        component:ListBannerCarouselComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-banner-c/:id',
        component:EditBannerCarouselComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'add-inmueble',
        component:AddInmuebleComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'list-inmueble',
        component:ListInmuebleComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-inmueble/:id',
        component:EditInmuebleComponent,
        canActivate:[adminOrAdminPlusGuard]
    }

    ,
    {
        path:'edit-imagen/:id',
        component:EditImagenComponent,
        canActivate:[adminOrAdminPlusGuard]
    }
    ,
    {
        path:'edit-archivo/:id',
        component:EditArchivoComponent,
        canActivate:[adminOrAdminPlusGuard]
    }





];
