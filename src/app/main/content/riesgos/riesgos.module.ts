import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RiesgosComponent } from './riesgos.component';
import {RiesgosListsComponent} from './tabs/listado/riesgos-lists.component';
import {EjerciciosListsComponent} from './tabs/ejercicios/ejercicios-lists.component';

const routes: Routes = [
    {
        path     : 'riesgos',
        component: RiesgosComponent
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
        EjerciciosListsComponent
    ],
    entryComponents: [

    ]
})
export class RiesgosModule
{
}
