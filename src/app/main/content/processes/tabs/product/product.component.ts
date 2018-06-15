import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../product/dialog/dialog.component';

@Component({
    selector   : 'product-classes',
    templateUrl: './product.component.html',
    styleUrls  : ['./product.component.scss']
})
export class ProductComponent implements OnInit
{
    rows: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;


    constructor(private http: HttpClient,public dialog: MatDialog)
    {

    }

    ngOnInit(){

      this.rows = new Array<any>();
        // this.http.get('api/product')
        //     .subscribe((product: any) => {
        //         this.rows = product;
        //         this.loadingIndicator = false;
        //     });
    }

    productDialog(){
        this.dialogRef = this.dialog.open(DialogComponent, {
            panelClass: 'product-dialog',
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
              this.rows.push(response);
              console.log(this.rows);
            });
    }
}
