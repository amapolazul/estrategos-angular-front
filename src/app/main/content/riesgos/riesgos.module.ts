import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RiesgosComponent } from './riesgos.component';
import {RiesgosListsComponent} from './tabs/listado/riesgos-lists.component';
import {EjerciciosListsComponent} from './tabs/ejercicios/ejercicios-lists.component';
import {EjercicioDialogComponent} from './tabs/ejercicios/dialog/ejercicio-dialog.component';
import {AdministracionListsComponent} from './tabs/administracion/administracion-lists.component';
import {DeclaracionComponent} from './tabs/administracion/declaracion/declaracion.component';
import {DeclaracionCreateComponent} from './tabs/administracion/declaracion/tabs/declaracion/declaracion-create.component';
import {EfectosListsComponent} from './tabs/administracion/declaracion/tabs/efectos/efectos-lists.component';
import {CausasListsComponent} from './tabs/administracion/declaracion/tabs/causas/causas-lists.component';
import {ControlesListsComponent} from './tabs/administracion/declaracion/tabs/controles/controles-lists.component';


const routes: Routes = [
    {
        path     : 'riesgos',
        component: RiesgosComponent
    },
    {
      path     : 'administracion-riesgos',
      component: AdministracionListsComponent
    },
    {
      path     : 'declaracion-riesgos',
      component: DeclaracionComponent
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
        AdministracionListsComponent,
        DeclaracionComponent,
        DeclaracionCreateComponent,
        EfectosListsComponent,
        CausasListsComponent,
        ControlesListsComponent

    ],
    entryComponents: [
        EjercicioDialogComponent,
        EjerciciosListsComponent,
        AdministracionListsComponent,
        DeclaracionComponent,
        DeclaracionCreateComponent,
        EfectosListsComponent,
        CausasListsComponent,
        ControlesListsComponent
    ]
})
export class RiesgosModule
{
}
