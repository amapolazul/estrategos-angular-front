import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypesDialogComponent } from '../types/dialog/types-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'risk-types',
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss']
})
export class SystemTypesComponent {
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

  typesDialog(){
    this.dialogRef = this.dialog.open(TypesDialogComponent, {
      panelClass: 'types-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
