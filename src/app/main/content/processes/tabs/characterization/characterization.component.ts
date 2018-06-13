import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CharacterizationDialogComponent } from './dialog/characterization-dialog.component';
import { CharacterizationInfoDialogComponent } from './dialog/characterization-info-dialog.component';


@Component({
    selector   : 'characterization-classes',
    templateUrl: './characterization.component.html',
    styleUrls  : ['./characterization.component.scss']
})
export class CharacterizationComponent
{
    rows: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient,public dialog: MatDialog)
    {

    }

    ngOnInit(){
        this.http.get('api/product')
            .subscribe((product: any) => {
                this.rows = product;
                this.loadingIndicator = false;
            });
    }

    characterizationDialog(){
        this.dialogRef = this.dialog.open(CharacterizationDialogComponent, {
            panelClass: 'characterization-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {

            });
    }

    characterizationInfoDialog(){
        this.dialogRef = this.dialog.open(CharacterizationInfoDialogComponent, {
          panelClass: 'characterization-info-dialog'
        });
        this.dialogRef.afterClosed()
          .subscribe(response => {

          });
    }
}
