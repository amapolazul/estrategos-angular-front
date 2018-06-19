import {Component, OnInit} from '@angular/core';
import {TypesDialogComponent} from '../types/dialog/types-dialog.component';
import {MatDialog} from '@angular/material';
import {TypesRiskService} from '../../system-tables/types/service/types-risk.service';
import {FormType} from '../../commons/form-type.enum';

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

  ngOnInit() {
    this.riskTypes = [];
    this.typesRiskService.getTypeRisk().subscribe((data: any) => {
      this.riskTypes = data;
      this.loadingIndicator = false;
    });
  }


  typesDialog() {
    this.dialogRef = this.dialog.open(TypesDialogComponent, {
      panelClass: 'types-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.riskTypes.push(response);
        this.riskTypes = [...this.riskTypes];
        this.loadingIndicator = false;
      });
  }

  edit(row, rowIndex){
    console.log(rowIndex);
    const product = row;
    this.dialogRef = this.dialog.open(TypesDialogComponent, {
      panelClass: 'types-dialog',
      data : {
        formType : FormType.edit,
        product : product
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.riskTypes[rowIndex] = response;
        this.riskTypes = [...this.riskTypes];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex) {
    this.typesRiskService.deleteTypeRisk(row.id).subscribe((data: any) => {
      console.log(data);
    });
    if (rowIndex > -1) {
      this.riskTypes.splice(rowIndex, 1);
      this.riskTypes = [...this.riskTypes];
    }
  }

}
