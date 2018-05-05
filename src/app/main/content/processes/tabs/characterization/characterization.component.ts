import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CharacterizationDialogComponent } from './dialog/characterization-dialog.component'

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

    productDialog(){
        this.dialogRef = this.dialog.open(CharacterizationDialogComponent, {
            panelClass: 'product-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {

            });
    }
}
