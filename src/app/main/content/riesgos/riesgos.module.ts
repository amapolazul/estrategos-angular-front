import {NgModule} from '@angular/core';
import {SharedModule} from '../../../core/modules/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RiesgosComponent} from './riesgos.component';
import {RiesgosListsComponent} from './tabs/riesgos/riesgos-lists.component';
import {EjerciciosListsComponent} from './tabs/ejercicios/ejercicios-lists.component';
import {EjercicioDialogComponent} from './tabs/ejercicios/dialog/ejercicio-dialog.component';
import {AdministracionListsComponent} from './tabs/administracion/administracion-lists.component';
import {DeclaracionComponent} from './tabs/administracion/declaracion/declaracion.component';
import {DeclaracionCreateComponent} from './tabs/administracion/declaracion/tabs/declaracion/declaracion-create.component';
import {EfectosListsComponent} from './tabs/administracion/declaracion/tabs/efectos/efectos-lists.component';
import {CausasListsComponent} from './tabs/administracion/declaracion/tabs/causas/causas-lists.component';
import {ControlesListsComponent} from './tabs/administracion/declaracion/tabs/controles/controles-lists.component';
import {CausasDeclaracionComponent} from './tabs/administracion/declaracion/tabs/causas/dialog/causas-declaracion.component';
import {EfectosDeclaracionComponent} from './tabs/administracion/declaracion/tabs/efectos/dialog/efectos-declaracion.component';
import {ControlesDeclaracionComponent} from './tabs/administracion/declaracion/tabs/controles/dialog/controles-declaracion.component';
import {RiesgoCausasDialogComponent} from './tabs/administracion/riesgos_causas/dialog/riesgo-causas-dialog.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';


const routes: Routes = [
    {
        path     : 'riesgos',
        component: RiesgosComponent
    },
    {
      path     : 'administracion-riesgos/:id',
      component: AdministracionListsComponent
    },
    {
      path     : 'declaracion-riesgos/:id',
      component: DeclaracionComponent
    },
    {
      path     : 'declaracion-riesgos/editar/:id',
      component: DeclaracionComponent
    }

];
@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        NgxChartsModule
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
        ControlesListsComponent,
        CausasDeclaracionComponent,
        EfectosDeclaracionComponent,
        ControlesDeclaracionComponent,
        RiesgoCausasDialogComponent
    ],
    entryComponents: [
        EjercicioDialogComponent,
        EjerciciosListsComponent,
        AdministracionListsComponent,
        DeclaracionComponent,
        DeclaracionCreateComponent,
        EfectosListsComponent,
        CausasListsComponent,
        ControlesListsComponent,
        CausasDeclaracionComponent,
        EfectosDeclaracionComponent,
        ControlesDeclaracionComponent,
        RiesgoCausasDialogComponent
    ]
})
export class RiesgosModule
{
}
