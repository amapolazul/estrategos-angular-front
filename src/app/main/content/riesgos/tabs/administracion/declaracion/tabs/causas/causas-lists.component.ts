import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CausasDeclaracionComponent} from './dialog/causas-declaracion.component';
import {DialogOverviewConfirmDialog} from '../../../../../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {RiesgosCalculosService} from '../../../../../services/riesgos-calculos.service';

@Component({
    selector   : 'causas-lists',
    templateUrl: './causas-lists.component.html',
    styleUrls  : ['./causas-lists.component.scss']
})
export class CausasListsComponent
{
    dialogRef: any;
    dialogConfirm: any;

    puntajes = [];
    rows = [];
    probabilidadTotal: number;

    @Output() actualizarProbabilidad = new EventEmitter<string>();

    constructor(public dialog: MatDialog, private riesgosCalculos: RiesgosCalculosService)
    {
      this.probabilidadTotal = 0;
    }

  causasDialog() {
    this.dialogRef = this.dialog.open(CausasDeclaracionComponent, {
      panelClass: 'causas-declaracion-dialog'
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.rows.push(response.formInfo);
        this.puntajes.push(response.probabilidadValue);
        this.calcularProbabilidadTotal();
        this.rows = [...this.rows];
      }
    });
  }

  calcularProbabilidadTotal() {
    if (this.puntajes.length > 0) {
      const suma = this.puntajes.reduce((x, y) => parseInt(x) + parseInt(y));
      console.log(suma);
      this.probabilidadTotal = Math.ceil(suma / this.puntajes.length);

    } else {
      this.probabilidadTotal = 0;
    }
    this.riesgosCalculos.setProbabilidadPromedio(this.probabilidadTotal);
    this.actualizarProbabilidad.next('');
  }

  delete(row, rowIndex) {
    if (rowIndex > -1) {
      this.puntajes.splice(rowIndex, 1);
      this.rows.splice(rowIndex, 1);
      this.rows = [...this.rows];

      this.calcularProbabilidadTotal();
    }
  }
}
