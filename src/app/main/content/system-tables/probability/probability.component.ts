import { Component, OnInit } from '@angular/core';
import { ProbabilityDialogComponent } from './dialog/probability-dialog.component';
import { MatDialog } from '@angular/material';
import { ProbabilityRiskService } from '../probability/service/probability-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {CustomSnackBarMessages} from '../../commons/messages.service';


@Component({
  selector: 'risk-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.scss']
})
export class SystemProbabilityComponent implements OnInit {
  probabilityRisk: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private probabilityRiskService: ProbabilityRiskService,
              public dialog: MatDialog,
              private customSnackMessage: CustomSnackBarMessages) {

  }

  ngOnInit(){
    this.probabilityRisk = [];
    this.probabilityRiskService.getProbabilityRisk().subscribe((data: any) => {
      this.probabilityRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  reloadTableServices(){
    this.probabilityRiskService.getProbabilityRisk().subscribe((data: any) => {
      this.probabilityRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  probabilityDialog(){
    this.dialogRef = this.dialog.open(ProbabilityDialogComponent, {
      panelClass: 'probability-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if ( response ) {
          this.reloadTableServices();
        }
      });
  }

  edit(row, rowIndex){
    console.log(rowIndex);
    const product = row;
    this.dialogRef = this.dialog.open(ProbabilityDialogComponent, {
      panelClass: 'probability-dialog',
      data : {
        formType : FormType.edit,
        product : product
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if( response ) {
          this.reloadTableServices();
        }
      });
  }

  delete(row, rowIndex) {
    this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: { name: row.probabilidad }
    });
    this.dialogConfirm.afterClosed()
      .subscribe(response => {
        console.log(response)
        this.deleteRow(response, row, rowIndex);
      });
  }

  deleteRow(result, row, rowIndex) {
    if( result ) {
      this.probabilityRiskService.deleteProbabilityRisk(row.id).subscribe((data: any) => {
        console.log(data);
        if (rowIndex > -1) {
          this.probabilityRisk.splice(rowIndex, 1);
          this.probabilityRisk = [...this.probabilityRisk];
          this.customSnackMessage.openSnackBar('Registro eliminado');
        }
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.probabilidad.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.probabilityRisk = temp;
  }
}
