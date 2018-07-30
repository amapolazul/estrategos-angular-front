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
import { ControlsDialogComponent } from './controls/dialog/controls-dialog.component';
import { SystemControlsComponent } from './controls/controls.component';
import {SystemResponseComponent} from './response/response.component';
import {ResponseDialogComponent} from './response/dialog/response-dialog.component';

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
  },
  {
    path     : 'tablas-sistema/niveles-controles',
    component: SystemControlsComponent
  },
  {
    path     : 'tablas-sistema/respuestas-riesgo',
    component: SystemResponseComponent
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
    SystemControlsComponent,
    SystemResponseComponent,
    CausesDialogComponent,
    ImpactDialogComponent,
    ProbabilityDialogComponent,
    RatingDialogComponent,
    TypesDialogComponent,
    ControlsDialogComponent,
    ResponseDialogComponent,
  ],
  entryComponents: [
    CausesDialogComponent,
    ImpactDialogComponent,
    ProbabilityDialogComponent,
    RatingDialogComponent,
    TypesDialogComponent,
    ControlsDialogComponent,
    ResponseDialogComponent
  ]
})
export class SystemTablesModule
{
}
