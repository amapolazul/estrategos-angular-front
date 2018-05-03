import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SystemRatingComponent } from './rating.component';

const routes: Routes = [
    {
        path     : 'rating',
        component: SystemRatingComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SystemRatingComponent
    ]
})
export class SystemRatingModule
{
}
