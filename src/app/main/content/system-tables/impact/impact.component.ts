import {Component, OnInit} from '@angular/core';
import {ImpactDialogComponent} from './dialog/impact-dialog.component';
import {MatDialog} from '@angular/material';
import {ImpactRiskService} from '../impact/service/impact-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {CustomSnackBarMessages} from '../../commons/messages.service';
declare let jsPDF;

@Component({
  selector: 'risk-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class SystemImpactComponent implements OnInit {

  impactRisk: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;
  reorderable = true;
  limit = true;

  constructor(private probabilityRiskService: ImpactRiskService,
              public dialog: MatDialog,
              private customSnackMessage: CustomSnackBarMessages) {

  }

  ngOnInit() {
    this.impactRisk = [];
    this.probabilityRiskService.getImpactRisk().subscribe((data: any) => {
      this.impactRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
      if (this.impactRisk.length > 4 ){
        this.limit = false;
      }
    });
  }

  download(){
    const doc = new jsPDF();
    const col = ["ID", "Impacto", "Puntaje", "Descripción"];
    const rows = [];

    this.impactRisk.forEach(x => {
      const temp = [x.id,
        x.impacto,
        x.puntaje,
        x.descripcion];
      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Impacto_del_riesgo.pdf');
  }

  reloadTableServices() {
    this.probabilityRiskService.getImpactRisk().subscribe((data: any) => {
      this.impactRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
      if (this.impactRisk.length > 4 ){
        this.limit = false;
      }else{
        this.limit = true;
      }
    });
  }

  impactDialog() {
    this.dialogRef = this.dialog.open(ImpactDialogComponent, {
      panelClass: 'impact-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  edit(row, rowIndex) {
    console.log(rowIndex);
    const product = row;
    this.dialogRef = this.dialog.open(ImpactDialogComponent, {
      panelClass: 'impact-dialog',
      data: {
        formType: FormType.edit,
        product: product
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  delete(row, rowIndex) {
    this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: {name: row.impacto}
    });
    this.dialogConfirm.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.deleteRow(response, row, rowIndex);
      });
  }

  deleteRow(result, row, rowIndex) {
    if (result) {
      this.probabilityRiskService.deleteImpactRisk(row.id).subscribe((data: any) => {
        if (rowIndex > -1) {
          this.impactRisk.splice(rowIndex, 1);
          this.reloadTableServices();
          this.customSnackMessage.openSnackBar('Registro eliminado');
        }
      }, (err: any) => {
        this.customSnackMessage.openSnackBar('Ocurrio un error eliminando el registro de la tabla');
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.impacto.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.impactRisk = temp;
  }
}
