import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SystemImpactComponent } from './impact.component';

const routes: Routes = [
    {
        path     : 'impact',
        component: SystemImpactComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SystemImpactComponent
    ]
})
export class SystemImpactModule
{
}
