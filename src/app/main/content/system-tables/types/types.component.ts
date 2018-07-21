import {Component, Inject, OnInit} from '@angular/core';
import {TypesDialogComponent} from '../types/dialog/types-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TypesRiskService} from '../../system-tables/types/service/types-risk.service';
import {FormType} from '../../commons/form-type.enum';
import { DialogOverviewConfirmDialog, DialogOverviewConfirm } from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';

@Component({
  selector: 'risk-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class SystemTypesComponent implements OnInit {
  riskTypes: any[];
  temp: any[];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;
  name :any;

  constructor(private typesRiskService: TypesRiskService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.riskTypes = [];
    this.typesRiskService.getTypeRisk().subscribe((data: any) => {
      this.riskTypes = data;
      this.temp = [...data];
      this.loadingIndicator = false;
      console.log(this.riskTypes);
    });
  }


  typesDialog() {
    this.dialogRef = this.dialog.open(TypesDialogComponent, {
      panelClass: 'types-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.riskTypes.push(response);
        this.riskTypes = [...this.riskTypes];
        this.loadingIndicator = false;
      });
  }

  edit(row, rowIndex) {
    console.log(rowIndex);
    const product = row;
    this.dialogRef = this.dialog.open(TypesDialogComponent, {
      panelClass: 'types-dialog',
      data: {
        formType: FormType.edit,
        product: product
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.riskTypes[rowIndex] = response;
        this.riskTypes = [...this.riskTypes];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex) {
    const dialogRef = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: { name: row.tipo_riesgo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The tabs-riesgo was closed');
      this.deleteRow(result, row, rowIndex);
    });

  }

  deleteRow(result, row, rowIndex){
    if( result === undefined){
       this.typesRiskService.deleteTypeRisk(row.id).subscribe((data: any) => {
       console.log(data);
      });
      if (rowIndex > -1) {
        this.riskTypes.splice(rowIndex, 1);
        this.riskTypes = [...this.riskTypes];
      }
    }

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.tipo_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.riskTypes = temp;
  }
}

