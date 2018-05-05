import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { ProcessesComponent } from './processes.component';
import { ProductComponent } from './tabs/product/product.component';
import { ProcessComponent } from './tabs/process/process.component';
import { CharacterizationComponent } from './tabs/characterization/characterization.component';
import { DialogComponent } from '../processes/tabs/product/dialog/dialog.component';
import { CharacterizationDialogComponent } from '../processes/tabs/characterization/dialog/characterization-dialog.component';

const routes: Routes = [
    {
        path     : 'cargar-procesos',
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
        CharacterizationComponent,
        DialogComponent,
        CharacterizationDialogComponent
    ],
    entryComponents: [
        DialogComponent,
        CharacterizationDialogComponent
    ]
})
export class ProcessesModule
{
}
