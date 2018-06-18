import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {CharacterizationDialogComponent} from './dialog/edit-dialog/characterization-dialog.component';
import {CharacterizationInfoDialogComponent} from './dialog/attach-files-dialog/characterization-info-dialog.component';
import {FormType} from '../../../commons/form-type.enum';
import {Caracterizacion} from '../../models/process.model';


@Component({
  selector: 'characterization-classes',
  templateUrl: './characterization.component.html',
  styleUrls: ['./characterization.component.scss']
})
export class CharacterizationComponent implements OnInit {
  rows = [];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private http: HttpClient,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    // this.http.get('api/product')
    //     .subscribe((product: any) => {
    //         this.rows = product;
    //         this.loadingIndicator = false;
    //     });
  }

  characterizationDialog(row, rowIndex) {
    this.dialogRef = this.dialog.open(CharacterizationDialogComponent, {
      panelClass: 'characterization-dialog',
      disableClose: true
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.loadingIndicator = true;
        this.rows.push(response);
        this.rows = [...this.rows];
        this.loadingIndicator = false;
      });
  }

  attachFiles(row, rowIndex) {
    const caracterizacion = <Caracterizacion>row;
    this.dialogRef = this.dialog.open(CharacterizationInfoDialogComponent, {
      panelClass: 'characterization-info-dialog',
      disableClose: true,
      data: {
        caracterizacion: caracterizacion
      }
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.loadingIndicator = true;
        this.rows[rowIndex] = response;
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

  edit(row, rowIndex) {
    const caracterizacion = row;
    this.dialogRef = this.dialog.open(CharacterizationDialogComponent, {
      panelClass: 'product-dialog',
      disableClose: true,
      data: {
        formType: FormType.edit,
        caracterizacion: caracterizacion
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
