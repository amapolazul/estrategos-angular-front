import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ControlsDialogComponent } from './dialog/controls-dialog.component';
import { ControlsRiskService } from './service/controls-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {ControlsRiskModel} from './model/controls-risk.model';

@Component({
    selector: 'risk-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss']
})
export class SystemControlsComponent implements OnInit {

  controlsRisk: any[];
  temp: any[];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private controlsRiskService: ControlsRiskService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.controlsRiskService.getControlsRisk().subscribe((data: any) => {
      this.controlsRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  controlsDialog() {
    this.dialogRef = this.dialog.open(ControlsDialogComponent, {
      panelClass: 'controls-tabs-riesgo'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.ngOnInit();
      });
  }

  edit(row, rowIndex){
    console.log(rowIndex);
    const controlsRisk = row;
    this.dialogRef = this.dialog.open(ControlsDialogComponent, {
      panelClass: 'controls-tabs-riesgo',
      data : {
        formType : FormType.edit,
        controlsRisk : controlsRisk
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.controlsRisk[rowIndex] = response;
        this.controlsRisk = [...this.controlsRisk];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex) {
    console.log(row);
    console.log(rowIndex);
    if (rowIndex > -1) {
      const controls = <ControlsRiskModel>row;
      this.controlsRiskService.deleteControlsRisk(controls.id).subscribe((result) => {
        console.log('resultado -> ', result);
      }, (error) => {
        console.error(error);
      });
      this.controlsRisk.splice(rowIndex, 1);
      this.controlsRisk = [...this.controlsRisk];
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.causa_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.controlsRisk = temp;
  }

}
