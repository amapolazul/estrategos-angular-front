import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoServicio} from '../../../models/process.model';

@Component({
    selector     : 'product-dialog',
    templateUrl  : './dialog.component.html',
    styleUrls    : ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
      this.composeForm = this.formBuilder.group({
        proceso_Nombre: [''],
        producto_Servicio_nombre: [''],
        producto_Caracteristicas: ['']
      });
    }

    salir() {
      this.dialogRef.close();
    }

    guardar() {
      console.log('guardar');
      const producto = <ProductoServicio> this.composeForm.getRawValue();
      this.dialogRef.close(producto);
    }
}
