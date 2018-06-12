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
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private typesRiskService: TypesRiskService, public dialog: MatDialog) {

    }

    ngOnInit(){
        this.typesRiskService.getTypeRisk().subscribe((product: any) => {
            this.riskTypes = product;
            console.log('Hola bb')
            console.log(this.riskTypes);
            this.loadingIndicator = false;
          });
    }

    typesDialog(){
      this.dialogRef = this.dialog.open(TypesDialogComponent, {
        panelClass: 'types-dialog'
      });
      this.dialogRef.afterClosed()
        .subscribe(response => {

        });
    }
}
