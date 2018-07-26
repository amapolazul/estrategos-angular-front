import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EfectosDeclaracionComponent} from './dialog/efectos-declaracion.component';

@Component({
    selector   : 'efectos-lists',
    templateUrl: './efectos-lists.component.html',
    styleUrls  : ['./efectos-lists.component.scss']
})
export class EfectosListsComponent
{
    rows = [];
    puntajes = [];

    dialogRef: any;

    impactoTotal: number;

    constructor(public dialog: MatDialog) {
      this.impactoTotal = 0;
    }

  efectosDialog() {
    this.dialogRef = this.dialog.open(EfectosDeclaracionComponent, {
      panelClass: 'efectos-declaracion-dialog'
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.rows.push(response.formInfo);
        this.puntajes.push(response.impactoValue);
        this.calcularImpactoTotal();
        this.rows = [...this.rows];
      }
    });
  }

  calcularImpactoTotal() {
    if (this.puntajes.length > 0) {
      const suma = this.puntajes.reduce((x, y) => x + y);
      this.impactoTotal = Math.ceil(suma / this.puntajes.length);
    } else {
      this.impactoTotal = 0;
    }
  }


  delete(row, rowIndex) {
    if (rowIndex > -1) {
      this.puntajes.splice(rowIndex, 1);
      this.rows.splice(rowIndex, 1);
      this.rows = [...this.rows];

      this.calcularImpactoTotal();
    }
  }
}
