import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RiesgosComponent } from './riesgos.component';

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
        RiesgosComponent
    ],
    entryComponents: [

    ]
})
export class RiesgosModule
{
}
