import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ResponseDialogComponent } from './dialog/response-dialog.component';
import { ResponseRiskService } from './service/response-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {ResponseRiskModel} from './model/response-risk.model';

@Component({
    selector: 'risk-response',
    templateUrl: './response.component.html',
    styleUrls: ['./response.component.scss']
})
export class SystemResponseComponent implements OnInit {

  responseRisk: any[];
  temp: any[];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private responseRiskService: ResponseRiskService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.responseRiskService.getResponseRisk().subscribe((data: any) => {
      this.responseRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  responseDialog() {
    this.dialogRef = this.dialog.open(ResponseDialogComponent, {
      panelClass: 'response-tabs-riesgo'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.ngOnInit();
      });
  }

  edit(row, rowIndex){
    console.log(rowIndex);
    const responseRisk = row;
    this.dialogRef = this.dialog.open(ResponseDialogComponent, {
      panelClass: 'response-tabs-riesgo',
      data : {
        formType : FormType.edit,
        responseRisk : responseRisk
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.responseRisk[rowIndex] = response;
        this.responseRisk = [...this.responseRisk];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex) {
    console.log(row);
    console.log(rowIndex);
    if (rowIndex > -1) {
      const response = <ResponseRiskModel>row;
      this.responseRiskService.deleteResponseRisk(response.id).subscribe((result) => {
        console.log('resultado -> ', result);
      }, (error) => {
        console.error(error);
      });
      this.responseRisk.splice(rowIndex, 1);
      this.responseRisk = [...this.responseRisk];
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.causa_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.responseRisk = temp;
  }

}