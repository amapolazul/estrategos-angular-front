import { Component } from '@angular/core';
import {RatingRiskService} from '../../../system-tables/rating/service/rating-risk.service';
import {CausesDialogComponent} from '../../../system-tables/causes/dialog/causes-dialog.component';
import {FormType} from '../../../commons/form-type.enum';
import {Router} from '@angular/router';
import {RiesgosService} from '../../services/riesgos.service';
import {CustomSnackBarMessages} from '../../../commons/messages.service';

@Component({
    selector   : 'riesgos-lists',
    templateUrl: './riesgos-lists.component.html',
    styleUrls  : ['./riesgos-lists.component.scss']
})
export class RiesgosListsComponent
{
    rows = [];

    constructor(private calificacionRiesgoService: RatingRiskService,
                private riesgosService: RiesgosService,
                private snackBar: CustomSnackBarMessages,
                private route: Router)
    {

    }

    delete(row, rowIndex) {
      if (row.estatus_riesgo_id === 2) {
        this.snackBar.openSnackBar('No es permitido borrar un riesgo en estado Mitigado');
      } else {
        this.riesgosService.borrarRiesgo(row.id).subscribe(x => {
          if (rowIndex > -1) {
            this.rows.splice(rowIndex, 1);
            this.rows = [...this.rows];
            this.snackBar.openSnackBar('Registro eliminado');
          }
        }, error => {
          this.snackBar.openSnackBar('Ha ocurrido un error borrando el riesgo');
        });
      }
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
