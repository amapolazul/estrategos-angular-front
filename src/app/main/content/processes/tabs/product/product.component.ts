import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../product/dialog/dialog.component';
import {FormType} from '../../../commons/form-type.enum';

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

    selected = [];

    constructor(private http: HttpClient,public dialog: MatDialog)
    {

    }

    ngOnInit(){

      this.rows = [];
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
              this.rows = [...this.rows];
              this.loadingIndicator = false;
            });
    }

    delete(row, rowIndex) {
      if (rowIndex > -1) {
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];
      }
    }

    edit(row, rowIndex){
      console.log(rowIndex);
      const product = row;
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: 'product-dialog',
        data : {
          formType : FormType.edit,
          product : product
        }
      });

      this.dialogRef.afterClosed()
        .subscribe(response => {
          console.log(response);
          this.rows[rowIndex] = response;
          this.rows = [...this.rows];
          this.loadingIndicator = false;
        });
    }
}
