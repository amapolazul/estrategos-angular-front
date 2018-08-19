import { Component } from '@angular/core';
import {RatingRiskService} from '../../../system-tables/rating/service/rating-risk.service';
import {CausesDialogComponent} from '../../../system-tables/causes/dialog/causes-dialog.component';
import {FormType} from '../../../commons/form-type.enum';
import {Router} from '@angular/router';

@Component({
    selector   : 'riesgos-lists',
    templateUrl: './riesgos-lists.component.html',
    styleUrls  : ['./riesgos-lists.component.scss']
})
export class RiesgosListsComponent
{
    rows = [];

    constructor(private calificacionRiesgoService: RatingRiskService,
                private route: Router)
    {

    }

    edit(row, rowIndex){
      this.route.navigate(['declaracion-riesgos/editar', row.id]);
    }

    getCellClass(row): any {
      return {
        'is-yellow': row.calificacion_riesgo === 'Amarillo',
        'is-green': row.calificacion_riesgo === 'Verde',
        'is-red': row.calificacion_riesgo === 'Rojo'
      };
    }
}
