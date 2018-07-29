import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ControlesDeclaracionComponent} from './dialog/controles-declaracion.component';
import {RiesgosCalculosService} from '../../../../../services/riesgos-calculos.service';

@Component({
    selector   : 'controles-lists',
    templateUrl: './controles-lists.component.html',
    styleUrls  : ['./controles-lists.component.scss']
})
export class ControlesListsComponent
{
    dialogRef: any;
    dialogConfirm: any;
    puntajes = [];
    rows = [];
    efectividadTotal = 0;

    @Output() actualizarEfectividad = new EventEmitter<string>();

    constructor(public dialog: MatDialog,
                private riesgosCalculosService: RiesgosCalculosService)
    {

    }

    controlesDialog() {
      this.dialogRef = this.dialog.open(ControlesDeclaracionComponent, {
        panelClass: 'controles-declaracion-dialog'
      });

      this.dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.rows.push(response.formInfo);
          this.puntajes.push(response.efectividadValue);
          this.calcularEfectividadTotal();
          this.rows = [...this.rows];
        }
      });
    }

    calcularEfectividadTotal() {
      if (this.puntajes.length > 0) {
        const suma = this.puntajes.reduce((x, y) => x + y);
        this.efectividadTotal = Math.ceil(suma / this.puntajes.length);
      } else {
        this.efectividadTotal = 0;
      }

      this.riesgosCalculosService.setEfectividadPromedio(this.efectividadTotal);
      this.actualizarEfectividad.next();
    }


    delete(row, rowIndex) {
      if (rowIndex > -1) {
        this.puntajes.splice(rowIndex, 1);
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];

        this.calcularEfectividadTotal();
      }
    }
}
