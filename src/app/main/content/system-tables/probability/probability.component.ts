import { Component, OnInit } from '@angular/core';
import { ProbabilityDialogComponent } from './dialog/probability-dialog.component';
import { MatDialog } from '@angular/material';
import { ProbabilityRiskService } from '../probability/service/probability-risk.service';


@Component({
    selector: 'risk-probability',
    templateUrl: './probability.component.html',
    styleUrls: ['./probability.component.scss']
})
export class SystemProbabilityComponent implements OnInit {
    probabilityRisk: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

  constructor(private probabilityRiskService: ProbabilityRiskService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.probabilityRiskService.getProbabilityRisk().subscribe((data: any) => {
      this.probabilityRisk = data;
      this.loadingIndicator = false;
    });
  }

  probabilityDialog(){
    this.dialogRef = this.dialog.open(ProbabilityDialogComponent, {
      panelClass: 'probability-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.probabilityRisk.push(response);
        this.probabilityRisk = [...this.probabilityRisk];
        this.loadingIndicator = false;
      });
  }
}

