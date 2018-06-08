import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypesDialogComponent } from '../types/dialog/types-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'risk-types',
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss']
})
export class SystemTypesComponent implements OnInit {
    rows: any[];
    dialogRef: any;
    riskTypes: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient, public dialog: MatDialog)
    {

    }

    ngOnInit(){
      console.log('Hola bb');
        this.http.get('http://localhost:9000/tipo-riesgo/')
          .subscribe((product: any) => {
            this.rows = product;
            console.log(this.rows);
            this.loadingIndicator = false;
          });
           // .subscribe(data => {
           //   console.log(data);
           //   var riskTypes = data;
           // });
    }

  typesDialog(){
    this.dialogRef = this.dialog.open(TypesDialogComponent, {
      panelClass: 'types-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
