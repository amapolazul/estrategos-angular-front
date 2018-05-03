import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SystemProbabilityComponent } from './probability.component';

const routes: Routes = [
    {
        path     : 'probability',
        component: SystemProbabilityComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SystemProbabilityComponent
    ]
})
export class SystemProbabilityModule
{
}
