import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';
import { SharedModule } from '../../../core/modules/shared.module';
import { SystemCausesComponent } from './causes/causes.component';
import { SystemImpactComponent } from './impact/impact.component';
import { SystemProbabilityComponent } from './probability/probability.component';
import { SystemRatingComponent } from './rating/rating.component';
import { SystemTypesComponent } from './types/types.component';
import { CausesDialogComponent } from './causes/dialog/causes-dialog.component';
import { ImpactDialogComponent } from './impact/dialog/impact-dialog.component';
import { ProbabilityDialogComponent } from './probability/dialog/probability-dialog.component';
import { RatingDialogComponent } from './rating/dialog/rating-dialog.component';
import { TypesDialogComponent } from './types/dialog/types-dialog.component';

const routes = [
  {
    path     : 'tablas-sistema/causas',
    component: SystemCausesComponent
  },
  {
    path     : 'tablas-sistema/impacto',
    component: SystemImpactComponent
  },
  {
    path     : 'tablas-sistema/probabilidad',
    component: SystemProbabilityComponent
  },
  {
    path     : 'tablas-sistema/calificacion',
    component: SystemRatingComponent
  },
  {
    path     : 'tablas-sistema/tipos',
    component: SystemTypesComponent
  }
];


@NgModule({
  imports     : [
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    FuseAngularMaterialModule
  ],
  declarations: [
    SystemCausesComponent,
    SystemImpactComponent,
    SystemProbabilityComponent,
    SystemRatingComponent,
    SystemTypesComponent,
    CausesDialogComponent,
    ImpactDialogComponent,
    ProbabilityDialogComponent,
    RatingDialogComponent,
    TypesDialogComponent
  ],
  entryComponents: [
    CausesDialogComponent,
    ImpactDialogComponent,
    ProbabilityDialogComponent,
    RatingDialogComponent,
    TypesDialogComponent
  ]
})
export class SystemTablesModule
{
}
