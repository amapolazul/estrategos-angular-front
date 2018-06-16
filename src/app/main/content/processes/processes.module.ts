import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { ProcessesComponent } from './processes.component';
import { ProductComponent } from './tabs/product/product.component';
import { ProcessComponent } from './tabs/process/process.component';
import { CharacterizationComponent } from './tabs/characterization/characterization.component';
import { DialogComponent } from '../processes/tabs/product/dialog/dialog.component';
import { CharacterizationDialogComponent } from './tabs/characterization/dialog/edit-dialog/characterization-dialog.component';
import { CharacterizationInfoDialogComponent } from './tabs/characterization/dialog/attach-files-dialog/characterization-info-dialog.component';

const routes: Routes = [
    {
        path     : 'procesos/:id',
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
        CharacterizationDialogComponent,
        CharacterizationInfoDialogComponent
    ],
    entryComponents: [
        DialogComponent,
        CharacterizationDialogComponent,
        CharacterizationInfoDialogComponent
    ]
})
export class ProcessesModule
{
}
