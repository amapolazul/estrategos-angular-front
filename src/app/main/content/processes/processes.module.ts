import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { ProcessesComponent } from './processes.component';
import { ProductComponent } from './tabs/product/product.component';
//import { ProcessComponent } from './tabs/process/process.component';
//import { CharacterizationComponent } from './tabs/characterization/characterization.component';

const routes: Routes = [
    {
        path     : 'processes',
        component: ProcessesComponent
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [
        ProcessesComponent,
        ProductComponent,
        //ProcessComponent,
        //CharacterizationComponent
    ]
})
export class ProcessesClassesModule
{
}
