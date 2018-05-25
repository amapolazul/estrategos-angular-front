import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CausesDialogComponent } from './dialog/causes-dialog.component';

@Component({
    selector: 'risk-causes',
    templateUrl: './causes.component.html',
    styleUrls: ['./causes.component.scss']
})
export class SystemCausesComponent implements OnInit {

    rows: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient, public dialog: MatDialog)
    {

    }

    ngOnInit(){
        this.http.get('api/product')
            .subscribe((product: any) => {
                this.rows = product;
                this.loadingIndicator = false;
            });
    }

  causesDialog(){
    this.dialogRef = this.dialog.open(CausesDialogComponent, {
      panelClass: 'causes-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
