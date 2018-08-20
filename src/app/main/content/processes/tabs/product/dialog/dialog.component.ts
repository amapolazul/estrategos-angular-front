import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoServicio} from '../../../models/process.model';
import {FormType} from '../../../../commons/form-type.enum';
import {ProcessCache} from '../../../services/process-cache.service';

@Component({
    selector     : 'product-dialog',
    templateUrl  : './dialog.component.html',
    styleUrls    : ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit
{
    formErrors: any;
    showExtraToFields = false;
    composeForm: FormGroup;
    productoServicio = new ProductoServicio();
    isEditing = false;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogComponent>,
        private processCache: ProcessCache,
        @Inject(MAT_DIALOG_DATA) private data: any
    ){
      // Reactive form errors
      this.formErrors = {
        producto_Servicio_nombre: { },
        producto_Servicio_Codigo: { }
      };
    }

    ngOnInit()
    {
      this.composeForm = this.formBuilder.group({
        proceso_Nombre: [{value: '', disabled: true}],
        producto_Servicio_nombre: ['', [Validators.required]],
        producto_Servicio_Codigo: ['', [Validators.required]],
        producto_Caracteristicas: ''
      });
      if ( this.data && this.data.formType === FormType.edit ) {
        this.isEditing = true;
        this.productoServicio = this.data.product;
        this.llenarFormulario();
      } else {
        this.composeForm.setValue({
          proceso_Nombre : this.processCache.getProcessName() || '',
          producto_Servicio_nombre : '',
          producto_Servicio_Codigo : '',
          producto_Caracteristicas : ''
        });
      }
    }

  private llenarFormulario() {
    this.composeForm.setValue({
      proceso_Nombre: this.productoServicio.proceso_Nombre,
      producto_Servicio_nombre: this.productoServicio.producto_Servicio_nombre || '',
      producto_Servicio_Codigo: this.productoServicio.producto_Servicio_Codigo || '',
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
