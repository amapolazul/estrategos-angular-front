import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';
import { SharedModule } from '../../../core/modules/shared.module';
import {MatrizComponent} from './matriz/matriz.component';
import {MatrizRowComponent} from './matriz-row/matriz-row.component';

const routes = [
  {
    path     : 'probabilidad-impacto',
    component: MatrizComponent
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
    MatrizComponent,
    MatrizRowComponent

  ],
  entryComponents: [
    MatrizComponent,
    MatrizRowComponent

  ]
})
export class ProbabilidadImpactoModule
{
}
