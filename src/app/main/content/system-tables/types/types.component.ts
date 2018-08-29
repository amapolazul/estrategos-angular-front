import {Component, Inject, OnInit} from '@angular/core';
import {TypesDialogComponent} from '../types/dialog/types-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TypesRiskService} from '../../system-tables/types/service/types-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {CustomSnackBarMessages} from '../../commons/messages.service';

@Component({
  selector: 'risk-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class SystemTypesComponent implements OnInit {
  riskTypes: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;
  reorderable = true;
  name: any;

  constructor(private typesRiskService: TypesRiskService,
              public dialog: MatDialog,
              private customSnackMessage: CustomSnackBarMessages) {

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

  reloadTableServices() {
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
        if (response) {
          this.reloadTableServices();
        }
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
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  delete(row, rowIndex) {
    this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: {name: row.tipo_riesgo}
    });

    this.dialogConfirm.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.deleteRow(response, row, rowIndex);
      });

  }

  deleteRow(result, row, rowIndex) {
    if (result) {
      this.typesRiskService.deleteTypeRisk(row.id).subscribe((data: any) => {
        if (rowIndex > -1) {
          this.riskTypes.splice(rowIndex, 1);
          this.riskTypes = [...this.riskTypes];
          this.customSnackMessage.openSnackBar('Registro eliminado');
        }
      }, (err: any) => {
        this.customSnackMessage.openSnackBar('Ocurrio un error eliminando el registro de la tabla');
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.tipo_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.riskTypes = temp;
  }
}

