import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { ProcessesComponent } from './processes.component';
import { ProductComponent } from './tabs/product/product.component';
import { ProcessComponent } from './tabs/process/process.component';
import { CharacterizationComponent } from './tabs/characterization/characterization.component';

const routes: Routes = [
    {
        path     : 'processes',
        component: ProcessesComponent
    }
];
@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProcessesComponent,
        ProductComponent,
        ProcessComponent,
        CharacterizationComponent
    ]
})
export class ProcessesModule
{
}
