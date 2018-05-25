import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProbabilityDialogComponent } from './dialog/probability-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
    selector: 'risk-probability',
    templateUrl: './probability.component.html',
    styleUrls: ['./probability.component.scss']
})
export class SystemProbabilityComponent {
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

  probabilityDialog(){
    this.dialogRef = this.dialog.open(ProbabilityDialogComponent, {
      panelClass: 'probability-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}

