import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ControlesDeclaracionComponent} from './dialog/controles-declaracion.component';
import {DialogOverviewConfirmDialog} from '../../../../../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';

@Component({
    selector   : 'controles-lists',
    templateUrl: './controles-lists.component.html',
    styleUrls  : ['./controles-lists.component.scss']
})
export class ControlesListsComponent
{
    dialogRef: any;
    dialogConfirm: any;
    rows = [
      {
        'control_implementado' : 'Costos de producción',
        'efectividad'      : 'Alto (4)'
      },
      {
        'control_implementado' : 'producción',
        'efectividad'      : 'Alto (4)'
      },
      {
        'control_implementado'  : 'Activiades de compras',
        'efectividad'      : 'Media (3)'
      }];

    constructor(public dialog: MatDialog)
    {

    }

  causasDialog() {
    this.dialogRef = this.dialog.open(ControlesDeclaracionComponent, {
      panelClass: 'controles-declaracion-dialog'
    });
  }


  delete(row, rowIndex) {
    this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: { name: row.causa_riesgo }
    });
    this.dialogConfirm.afterClosed()
      .subscribe(response => {

      });
  }
}
