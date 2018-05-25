import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImpactDialogComponent } from './dialog/impact-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'risk-impact',
    templateUrl: './impact.component.html',
    styleUrls: ['./impact.component.scss']
})
export class SystemImpactComponent {

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

  impactDialog(){
    this.dialogRef = this.dialog.open(ImpactDialogComponent, {
      panelClass: 'impact-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
