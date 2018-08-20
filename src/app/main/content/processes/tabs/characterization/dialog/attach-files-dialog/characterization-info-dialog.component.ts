import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Caracterizacion, DocumentoCaracterizacion} from '../../../../models/process.model';

@Component({
  selector: 'characterization-info-dialog',
  templateUrl: './characterization-info-dialog.component.html',
  styleUrls: ['./characterization-info-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterizationInfoDialogComponent implements OnInit {
  attachFileForm: FormGroup;
  caracterizacion: Caracterizacion;
  rows = [];
  loadingIndicator = false;
  reorderable = true;
  document: File = null;

  showAttachFilesForm = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CharacterizationInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

  }

  ngOnInit() {

    this.caracterizacion = this.data.caracterizacion;

    this.rows = this.caracterizacion.documentosCaracterizacion;

    this.attachFileForm = this.formBuilder.group({
      procedimiento_Documento_Nombre: '',
      procedimiento_Documento_Descripcion: '',
      procedimiento_Documento_Codigo: '',
      procedimiento_Documento_Arch: '',
    });

  }

  showAttachFilesFormF() {
      this.attachFileForm.setValue({
        procedimiento_Documento_Nombre: '',
        procedimiento_Documento_Descripcion: '',
        procedimiento_Documento_Codigo: '',
        procedimiento_Documento_Arch: '',
      });
      this.showAttachFilesForm = true;
  }

  handleFileInput(files: FileList) {
    this.document =  files.item(0);
    this.attachFileForm.patchValue({
      procedimiento_Documento_Arch : this.document.name
    });
  }

  saveFile() {
    const documentoCaracterizacion = <DocumentoCaracterizacion>this.attachFileForm.getRawValue();
    documentoCaracterizacion.attached_file = this.document;
    this.addDocumentoCaracterizacion(documentoCaracterizacion);
    this.rows = this.caracterizacion.documentosCaracterizacion;
    this.showAttachFilesForm = false;
    this.loadingIndicator = false;
    this.rows = [...this.rows];
  }

  private addDocumentoCaracterizacion(doc: DocumentoCaracterizacion) {
    const docList = this.caracterizacion.documentosCaracterizacion;
    docList.push(doc);
    this.caracterizacion.documentosCaracterizacion = docList;
  }

  cancel() {
    this.showAttachFilesForm = false;
  }

  delete(row, rowIndex) {
    if (rowIndex > -1) {
      this.caracterizacion.documentosCaracterizacion.splice(rowIndex, 1);
      this.rows = this.caracterizacion.documentosCaracterizacion;
      this.rows = [...this.rows];
    }
  }

  closeAndSaveAttachFiles() {
    this.dialogRef.close(this.caracterizacion);
  }

  closeDialog() {
    this.dialogRef.close();
  }


  // edit(row, rowIndex) {
  //   this.documentoCaracterizacion = <DocumentoCaracterizacion>row;
  //   this.attachFileForm.setValue({
  //     procedimiento_Documento_Nombre: this.documentoCaracterizacion.procedimiento_Documento_Nombre || '',
  //     procedimiento_Documento_Descripcion: this.documentoCaracterizacion.procedimiento_Documento_Descripcion || '',
  //     procedimiento_Documento_Codigo: this.documentoCaracterizacion.procedimiento_Documento_Codigo || '',
  //     procedimiento_Documento_Arch: this.documentoCaracterizacion.procedimiento_Documento_Arch || '',
  //   });
  //   this.showAttachFilesForm = true;
  //
  // }
}
