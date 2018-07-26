import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CausasDeclaracionComponent} from './dialog/causas-declaracion.component';

@Component({
    selector   : 'causas-lists',
    templateUrl: './causas-lists.component.html',
    styleUrls  : ['./causas-lists.component.scss']
})
export class CausasListsComponent
{
    dialogRef: any;
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
}
