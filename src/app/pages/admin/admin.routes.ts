import { Routes } from '@angular/router';
import { AddTipoComponent } from './add-tipo/add-tipo.component';
import { ListTipoComponent } from './list-tipo/list-tipo.component';
import { EditTipoComponent } from './edit-tipo/edit-tipo.component';
import { AddProvinciaComponent } from './add-provincia/add-provincia.component';
import { ListProvinciaComponent } from './list-provincia/list-provincia.component';
import { EditProvinciaComponent } from './edit-provincia/edit-provincia.component';

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



];