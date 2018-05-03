import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SystemCausesComponent } from './causes.component';

const routes: Routes = [
    {
        path     : 'causes',
        component: SystemCausesComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SystemCausesComponent
    ]
})
export class SystemCausesModule
{
}
