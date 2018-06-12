import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypesDialogComponent } from '../types/dialog/types-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'risk-types',
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss']
})
export class SystemTypesComponent implements OnInit {
    riskTypes: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient, public dialog: MatDialog)
    {

    }

    ngOnInit(){
        this.http.get('http://localhost:9000/tipo-riesgo/')
          .subscribe((product: any) => {
            this.riskTypes = product;
            console.log(this.riskTypes);
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
