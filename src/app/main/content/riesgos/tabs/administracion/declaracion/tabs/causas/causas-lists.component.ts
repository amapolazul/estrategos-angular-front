import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CausasDeclaracionComponent} from './dialog/causas-declaracion.component';
import {DialogOverviewConfirmDialog} from '../../../../../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';

@Component({
    selector   : 'causas-lists',
    templateUrl: './causas-lists.component.html',
    styleUrls  : ['./causas-lists.component.scss']
})
export class CausasListsComponent
{
    dialogRef: any;
    dialogConfirm: any;
    rows = [
      {
        'causa'       : 'Costos de producción',
        'probabilidad'      : 'Alto (4)'
      },
      {
        'causa'       : 'producción',
        'probabilidad'      : 'Alto (4)'
      },
      {
        'causa'       : 'Activiades de compras',
        'probabilidad'      : 'Media (3)'
      }];

    constructor(public dialog: MatDialog)
    {

    }

  causasDialog() {
    this.dialogRef = this.dialog.open(CausasDeclaracionComponent, {
      panelClass: 'causas-declaracion-dialog'
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
