import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RiesgosComponent } from './riesgos.component';
import {RiesgosListsComponent} from './tabs/listado/riesgos-lists.component';
import {EjerciciosListsComponent} from './tabs/ejercicios/ejercicios-lists.component';
import {EjercicioDialogComponent} from './tabs/ejercicios/dialog/ejercicio-dialog.component';
import {AdministracionListsComponent} from './tabs/administracion/administracion-lists.component';


const routes: Routes = [
    {
        path     : 'riesgos',
        component: RiesgosComponent
    },
    {
      path     : 'administracion-riesgos',
      component: AdministracionListsComponent
    }

];
@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RiesgosComponent,
        RiesgosListsComponent,
        EjercicioDialogComponent,
        EjerciciosListsComponent,
        AdministracionListsComponent

    ],
    entryComponents: [
        EjercicioDialogComponent,
        EjerciciosListsComponent,
        AdministracionListsComponent
    ]
})
export class RiesgosModule
{
}
