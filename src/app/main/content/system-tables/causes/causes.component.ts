import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CausesDialogComponent} from './dialog/causes-dialog.component';
import {CausesRiskService} from './service/causes-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {CustomSnackBarMessages} from '../../commons/messages.service';

@Component({
  selector: 'risk-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss']
})
export class SystemCausesComponent implements OnInit {

  causesRisk: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private causesRiskService: CausesRiskService,
              public dialog: MatDialog,
              private customSnackMessage: CustomSnackBarMessages) {

  }

  ngOnInit() {
    this.causesRiskService.getCausesRisk().subscribe((data: any) => {
      this.causesRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  reloadTableServices() {
    this.causesRiskService.getCausesRisk().subscribe((data: any) => {
      this.causesRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  causesDialog() {
    this.dialogRef = this.dialog.open(CausesDialogComponent, {
      panelClass: 'causes-tabs-riesgo'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  edit(row, rowIndex) {
    const causesRisk = row;
    this.dialogRef = this.dialog.open(CausesDialogComponent, {
      panelClass: 'causes-tabs-riesgo',
      data: {
        formType: FormType.edit,
        causesRisk: causesRisk
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.reloadTableServices();
        }
      });
  }

  delete(row, rowIndex) {
    this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: {name: row.causa_riesgo}
    });
    this.dialogConfirm.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.deleteRow(response, row, rowIndex);
      });
  }

  deleteRow(result, row, rowIndex) {
    if (result) {
      this.causesRiskService.deleteCausesRisk(row.id).subscribe((data: any) => {
        console.log(data);
        if (rowIndex > -1) {
          this.causesRisk.splice(rowIndex, 1);
          this.causesRisk = [...this.causesRisk];
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
      return d.causa_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.causesRisk = temp;
  }

}
