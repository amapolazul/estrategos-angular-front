import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../product/dialog/dialog.component';

@Component({
    selector   : 'product-classes',
    templateUrl: './product.component.html',
    styleUrls  : ['./product.component.scss']
})
export class ProductComponent
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

    newDialog(){
        console.log('Hola bb')
        this.dialogRef = this.dialog.open(DialogComponent, {
            panelClass: 'dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {

            });
    }
}
