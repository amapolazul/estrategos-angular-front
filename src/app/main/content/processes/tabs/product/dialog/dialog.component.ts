import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoServicio} from '../../../models/process.model';
import {FormType} from '../../../../commons/form-type.enum';

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
    productoServicio = new ProductoServicio();
    isEditing = false;

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
      if ( this.data && this.data.formType === FormType.edit ) {
        this.isEditing = true;
        this.productoServicio = this.data.product;
        this.llenarFormulario();
      }
    }

  private llenarFormulario() {
    this.composeForm.setValue({
      proceso_Nombre: this.productoServicio.proceso_Nombre,
      producto_Servicio_nombre: this.productoServicio.producto_Servicio_nombre || '',
      producto_Caracteristicas: this.productoServicio.producto_Caracteristicas || ''
    });
  }

    salir() {
      this.dialogRef.close();
    }

    guardar() {
      const producto = <ProductoServicio> this.composeForm.getRawValue();
      this.dialogRef.close(producto);
    }
}
