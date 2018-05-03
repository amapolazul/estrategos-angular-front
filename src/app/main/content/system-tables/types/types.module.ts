import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SystemTypesComponent } from './types.component';

const routes: Routes = [
    {
        path     : 'types',
        component: SystemTypesComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SystemTypesComponent
    ]
})
export class SystemRatingModule
{
}
