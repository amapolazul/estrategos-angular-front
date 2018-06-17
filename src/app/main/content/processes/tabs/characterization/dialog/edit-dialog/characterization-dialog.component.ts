import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material';
import {Caracterizacion, DocumentoCaracterizacion, ProductoServicio} from '../../../../models/process.model';
import {FormType} from '../../../../../commons/form-type.enum';

@Component({
    selector     : 'characterization-dialog',
    templateUrl  : './characterization-dialog.component.html',
    styleUrls    : ['./characterization-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharacterizationDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;
    isEditing = false;
    caracterizacion = new Caracterizacion();

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CharacterizationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any

    )
    {  }

    ngOnInit() {
      this.composeForm = this.formBuilder.group({
        procedimiento_Nombre: [''],
        procedimiento_Codigo: [''],
        procedimiento_Objetivo: [''],
      });

      if ( this.data && this.data.formType === FormType.edit ) {
        this.isEditing = true;
        this.caracterizacion = this.data.caracterizacion;
        this.llenarFormulario();
      }
    }

    private llenarFormulario() {
      this.composeForm.setValue({
        procedimiento_Nombre: this.caracterizacion.procedimiento_Nombre || '',
        procedimiento_Codigo: this.caracterizacion.procedimiento_Codigo || '',
        procedimiento_Objetivo: this.caracterizacion.procedimiento_Objetivo || ''
      });
    }

    salir() {
      this.dialogRef.close();
    }

    guardar() {
      const producto = <Caracterizacion> this.composeForm.getRawValue();
      this.dialogRef.close(producto);
    }

}
