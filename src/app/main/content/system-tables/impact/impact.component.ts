import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImpactDialogComponent } from './dialog/impact-dialog.component';
import { MatDialog } from '@angular/material';
import { ImpactRiskService } from '../impact/service/impact-risk.service';


@Component({
    selector: 'risk-impact',
    templateUrl: './impact.component.html',
    styleUrls: ['./impact.component.scss']
})
export class SystemImpactComponent implements OnInit{

    impactRisk: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

  constructor(private probabilityRiskService: ImpactRiskService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.probabilityRiskService.getImpactRisk().subscribe((data: any) => {
      console.log("bb");
      this.impactRisk = data;
      console.log(this.impactRisk);
      this.loadingIndicator = false;
    });
  }

  impactDialog(){
    this.dialogRef = this.dialog.open(ImpactDialogComponent, {
      panelClass: 'impact-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
