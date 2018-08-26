import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {CharacterizationDialogComponent} from './dialog/edit-dialog/characterization-dialog.component';
import {CharacterizationInfoDialogComponent} from './dialog/attach-files-dialog/characterization-info-dialog.component';
import {FormType} from '../../../commons/form-type.enum';
import {Caracterizacion} from '../../models/process.model';
import {CharacterizationService} from './services/characterization.service';
import {CustomSnackBarMessages} from '../../../commons/messages.service';


@Component({
  selector: 'characterization-classes',
  templateUrl: './characterization.component.html',
  styleUrls: ['./characterization.component.scss']
})
export class CharacterizationComponent implements OnInit, OnChanges {
  rows = [];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;
  deleteDisable = true;

  @Input() caracterizacionesEditar: Caracterizacion[];

  constructor(private http: HttpClient,
              private customSnackMessage: CustomSnackBarMessages,
              private characterizationService: CharacterizationService,
              public dialog: MatDialog) {

  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.caracterizacionesEditar) {
      this.rows = this.caracterizacionesEditar;
      this.rows = [...this.rows];
      this.loadingIndicator = false;
      this.deleteDisable = false;
    }
  }

  characterizationDialog(row, rowIndex) {
    this.dialogRef = this.dialog.open(CharacterizationDialogComponent, {
      panelClass: 'characterization-dialog',
      disableClose: true
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.loadingIndicator = true;
          this.rows.push(response);
          this.rows = [...this.rows];
          this.loadingIndicator = false;
        }
      });
  }

  attachFiles(row, rowIndex) {
    const caracterizacion = <Caracterizacion>row;
    this.dialogRef = this.dialog.open(CharacterizationInfoDialogComponent, {
      panelClass: 'characterization-info-dialog',
      disableClose: true,
      data: {
        caracterizacion: caracterizacion,
        deleteDisable: this.deleteDisable
      }
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.loadingIndicator = true;
          this.rows[rowIndex] = response;
          this.rows = [...this.rows];
          this.loadingIndicator = false;
        }
      });
  }

  delete(row, rowIndex) {
    if (row.caraceterizacion_id) {
      this.characterizationService.deleteCaracterizacion(row.caraceterizacion_id).subscribe(x => {
        if (rowIndex > -1) {
          this.customSnackMessage.openSnackBar('Registro de caracterización borrado correctamente');
          this.rows.splice(rowIndex, 1);
          this.rows = [...this.rows];
        }
      }, y => {
        this.customSnackMessage.openSnackBar('Ha ocurrido un error borrando el registro de caracterización');
      });
    } else {
      if (rowIndex > -1) {
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];
      }
    }
  }

  edit(row, rowIndex) {
    const caracterizacion = row;
    this.dialogRef = this.dialog.open(CharacterizationDialogComponent, {
      panelClass: 'product-dialog',
      disableClose: true,
      data: {
        formType: FormType.edit,
        caracterizacion: caracterizacion
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.rows[rowIndex] = response;
          this.rows = [...this.rows];
          this.loadingIndicator = false;
        }
      });
  }
}
