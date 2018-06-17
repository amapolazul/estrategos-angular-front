import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Caracterizacion, DocumentoCaracterizacion} from '../../../../models/process.model';
import {FormType} from '../../../../../commons/form-type.enum';
import {CharacterizationDialogComponent} from '../edit-dialog/characterization-dialog.component';

@Component({
  selector: 'characterization-info-dialog',
  templateUrl: './characterization-info-dialog.component.html',
  styleUrls: ['./characterization-info-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterizationInfoDialogComponent implements OnInit {
  attachFileForm: FormGroup;
  composeForm: FormGroup;
  caracterizacion: Caracterizacion;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  documentoCaracterizacion : DocumentoCaracterizacion;

  showAttachFilesForm = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CharacterizationInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {

    this.caracterizacion = this.data.caracterizacion;

    this.attachFileForm = this.formBuilder.group({
      procedimiento_Documento_Nombre: '',
      procedimiento_Documento_Descripcion: '',
      procedimiento_Documento_Codigo: '',
      procedimiento_Documento_Arch: '',
    });

  }

  delete(row, rowIndex) {
    if (rowIndex > -1) {
      this.rows.splice(rowIndex, 1);
      this.rows = [...this.rows];
    }
  }

  edit(row, rowIndex) {
    this.documentoCaracterizacion = <DocumentoCaracterizacion>row;
    this.attachFileForm.setValue({
      procedimiento_Documento_Nombre: this.documentoCaracterizacion.procedimiento_Documento_Nombre || '',
      procedimiento_Documento_Descripcion: this.documentoCaracterizacion.procedimiento_Documento_Descripcion || '',
      procedimiento_Documento_Codigo: this.documentoCaracterizacion.procedimiento_Documento_Codigo || '',
      procedimiento_Documento_Arch: this.documentoCaracterizacion.procedimiento_Documento_Arch || '',
    });
    this.showAttachFilesForm = true;

  }
}
