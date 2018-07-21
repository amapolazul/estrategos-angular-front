import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CausesDialogComponent } from './dialog/causes-dialog.component';
import { CausesRiskService } from './service/causes-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {CausesRiskModel} from './model/causes-risk.model';

@Component({
    selector: 'risk-causes',
    templateUrl: './causes.component.html',
    styleUrls: ['./causes.component.scss']
})
export class SystemCausesComponent implements OnInit {

  causesRisk: any[];
  temp: any[];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private causesRiskService: CausesRiskService, public dialog: MatDialog) {

  }

  ngOnInit() {
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
        this.ngOnInit();
      });
  }

  edit(row, rowIndex){
    console.log(rowIndex);
    const causesRisk = row;
    this.dialogRef = this.dialog.open(CausesDialogComponent, {
      panelClass: 'causes-tabs-riesgo',
      data : {
        formType : FormType.edit,
        causesRisk : causesRisk
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.causesRisk[rowIndex] = response;
        this.causesRisk = [...this.causesRisk];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex) {
    console.log(row);
    console.log(rowIndex);
    if (rowIndex > -1) {
      const causes = <CausesRiskModel>row;
      this.causesRiskService.deleteCausesRisk(causes.id).subscribe((result) => {
        console.log('resultado -> ', result);
      }, (error) => {
        console.error(error);
      });
      this.causesRisk.splice(rowIndex, 1);
      this.causesRisk = [...this.causesRisk];
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.causa_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.causesRisk = temp;
  }

}
