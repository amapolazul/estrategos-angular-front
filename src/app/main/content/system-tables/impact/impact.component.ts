import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImpactDialogComponent } from './dialog/impact-dialog.component';
import { MatDialog } from '@angular/material';
import { ImpactRiskService } from '../impact/service/impact-risk.service';
import {FormType} from '../../commons/form-type.enum';
import { ImpactRiskModel } from './model/impact-risk.model';
import {ProbabilityDialogComponent} from '../probability/dialog/probability-dialog.component';


@Component({
    selector: 'risk-impact',
    templateUrl: './impact.component.html',
    styleUrls: ['./impact.component.scss']
})
export class SystemImpactComponent implements OnInit{

    impactRisk: any[];
    temp: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

  constructor(private probabilityRiskService: ImpactRiskService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.impactRisk = [];
    this.probabilityRiskService.getImpactRisk().subscribe((data: any) => {
      this.impactRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  impactDialog(){
    this.dialogRef = this.dialog.open(ImpactDialogComponent, {
      panelClass: 'impact-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if( response ) {
          this.impactRisk.push(response);
          this.impactRisk = [...this.impactRisk];
          this.loadingIndicator = false;
        }
      });
  }

  edit(row, rowIndex){
    console.log(rowIndex);
    const product = row;
    this.dialogRef = this.dialog.open(ImpactDialogComponent, {
      panelClass: 'impact-dialog',
      data : {
        formType : FormType.edit,
        product : product
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if( response ) {
          this.impactRisk[rowIndex] = response;
          this.impactRisk = [...this.impactRisk];
          this.loadingIndicator = false;
        }
      });
  }

  delete(row, rowIndex)  {
    this.probabilityRiskService.deleteImpactRisk(row.id).subscribe((data: any) => {
      console.log(data);
    });
    if (rowIndex > -1) {
      this.impactRisk.splice(rowIndex, 1);
      this.impactRisk = [...this.impactRisk];
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.impacto.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.impactRisk = temp;
  }
}
