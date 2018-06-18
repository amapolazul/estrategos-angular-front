import { Component, OnInit} from '@angular/core';
import { TypesDialogComponent } from '../types/dialog/types-dialog.component';
import { MatDialog } from '@angular/material';
import { TypesRiskService } from '../../system-tables/types/service/types-risk.service';

@Component({
    selector: 'risk-types',
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss']
})
export class SystemTypesComponent implements OnInit {
    riskTypes: any[];
    restData: any;
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private typesRiskService: TypesRiskService, public dialog: MatDialog) {

    }

    ngOnInit(){
      this.riskTypes = [];
        this.typesRiskService.getTypeRisk().subscribe((data: any) => {
          this.riskTypes = data;
          this.loadingIndicator = false;
          });
    }

    saveTypeRisk(riskTypes){
      this.typesRiskService.postTypeRisk(riskTypes[0]).subscribe((data: any) => {
        this.restData = data;
        console.log(this.restData);
      });
    }

    typesDialog(){
      this.dialogRef = this.dialog.open(TypesDialogComponent, {
        panelClass: 'types-dialog'
      });
      this.dialogRef.afterClosed()
        .subscribe(response => {
          this.riskTypes.push(response);
          this.saveTypeRisk(this.riskTypes);
          this.riskTypes = [...this.riskTypes];
          this.loadingIndicator = false;
        });
    }
}
