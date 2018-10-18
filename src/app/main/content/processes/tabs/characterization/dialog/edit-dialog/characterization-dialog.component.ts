import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import {Caracterizacion, DocumentoCaracterizacion, ProductoServicio} from '../../../../models/process.model';
import {FormType} from '../../../../../commons/form-type.enum';
import {ProcessCache} from '../../../../services/process-cache.service';

@Component({
    selector     : 'characterization-dialog',
    templateUrl  : './characterization-dialog.component.html',
    styleUrls    : ['./characterization-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharacterizationDialogComponent implements OnInit
{
    formErrors: any;
    showExtraToFields = false;
    composeForm: FormGroup;
    isEditing = false;
    caracterizacion = new Caracterizacion();

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CharacterizationDialogComponent>,
        private processCache: ProcessCache,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
      // Reactive form errors
      this.formErrors = {
        procedimiento_Codigo: { }
      };
    }

    ngOnInit() {
      this.composeForm = this.formBuilder.group({
        procedimiento_Nombre: [{value: '', disabled: true}],
        procedimiento_Codigo: ['', [Validators.required]],
        procedimiento_Objetivo: [''],
      });

      if ( this.data && this.data.formType === FormType.edit ) {
        this.isEditing = true;
        this.caracterizacion = this.data.caracterizacion;
        this.llenarFormulario();
      } else {
        this.composeForm.setValue({
          procedimiento_Nombre: this.processCache.getProcessName() || '',
          procedimiento_Codigo: '',
          procedimiento_Objetivo: ''
        });
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
      const caracterizacion = <Caracterizacion> this.composeForm.getRawValue();
      if (this.caracterizacion.caraceterizacion_id){
        caracterizacion.caraceterizacion_id = this.caracterizacion.caraceterizacion_id;
        caracterizacion.documentosCaracterizacion = this.caracterizacion.documentosCaracterizacion;
      } else {
        caracterizacion.documentosCaracterizacion = [];
      }
      this.dialogRef.close(caracterizacion);
    }

}
