import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {ControlsDialogComponent} from './dialog/controls-dialog.component';
import {ControlsRiskService} from './service/controls-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {CustomSnackBarMessages} from '../../commons/messages.service';
declare let jsPDF;

@Component({
  selector: 'risk-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class SystemControlsComponent implements OnInit {

  controlsRisk: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private controlsRiskService: ControlsRiskService,
              public dialog: MatDialog,
              private customSnackMessage: CustomSnackBarMessages) {

  }

  ngOnInit() {
    this.controlsRiskService.getControlsRisk().subscribe((data: any) => {
      this.controlsRisk = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  download(){
    const doc = new jsPDF();
    const col = ["ID", "Efectividad", "Puntaje", "Descripción"];
    const rows = [];

    this.controlsRisk.forEach(x => {
      const temp = [x.id,
        x.efectividad_nombre,
        x.puntaje,
        x.descripcion];
      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Efectividad_de_los_controles.pdf');
  }

  reloadTableServices() {
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
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  edit(row, rowIndex) {
    console.log(rowIndex);
    const controlsRisk = row;
    this.dialogRef = this.dialog.open(ControlsDialogComponent, {
      panelClass: 'controls-tabs-riesgo',
      data: {
        formType: FormType.edit,
        controlsRisk: controlsRisk
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
      data: {name: row.efectividad_nombre}
    });
    this.dialogConfirm.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.deleteRow(response, row, rowIndex);
      });
  }

  deleteRow(result, row, rowIndex) {
    if (result) {
      this.controlsRiskService.deleteControlsRisk(row.id).subscribe((data: any) => {
        console.log(data);
        if (rowIndex > -1) {
          this.controlsRisk.splice(rowIndex, 1);
          this.controlsRisk = [...this.controlsRisk];
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
      return d.causa_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.controlsRisk = temp;
  }

}
