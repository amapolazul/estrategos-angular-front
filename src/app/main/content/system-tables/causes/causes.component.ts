import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CausesDialogComponent } from './dialog/causes-dialog.component';
import { CausesRiskService } from './service/causes-risk.service';


@Component({
    selector: 'risk-causes',
    templateUrl: './causes.component.html',
    styleUrls: ['./causes.component.scss']
})
export class SystemCausesComponent implements OnInit {

    causesRisk: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private causesRiskService: CausesRiskService, public dialog: MatDialog) {

    }

    ngOnInit(){
      this.causesRiskService.getCausesRisk().subscribe((data: any) => {
        console.log("bb");
        this.causesRisk = data;
        console.log(this.causesRisk);
        this.loadingIndicator = false;
      });
    }

  causesDialog(){
    this.dialogRef = this.dialog.open(CausesDialogComponent, {
      panelClass: 'causes-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
