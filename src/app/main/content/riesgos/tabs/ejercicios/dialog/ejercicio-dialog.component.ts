import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EjercicioEstatus, EjercicioModel} from '../model/ejercicio.model';
import {EjercicioService} from '../service/ejercicio.service';
import {CustomSnackBarMessages} from '../../../../commons/messages.service';
import {FormType} from '../../../../commons/form-type.enum';
import {Proceso} from '../../../../processes/models/process.model';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'ejercicio-dialog',
  templateUrl: './ejercicio-dialog.component.html',
  styleUrls: ['./ejercicio-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EjercicioDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  ejercicioModel = new EjercicioModel();
  selectedProcess: Proceso;
  ejercicioEstados: Observable<EjercicioEstatus[]>;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EjercicioDialogComponent>,
    private ejercicioService: EjercicioService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.selectedProcess = this.data.proceso;

    // Reactive form errors
    this.formErrors = {
      estatus_id: {}
    };
  }

  ngOnInit() {

    this.composeForm = this.formBuilder.group({
      descripcion: [''],
      estatus_id: ['', [Validators.required]]
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.ejercicioModel = this.data.ejercicio;
      this.dataForm();
    }

    this.ejercicioEstados = this.ejercicioService.getEjercicioEstados();
  }

  saveEjercicio() {
    if (this.data && this.data.formType === FormType.edit) {
      let ejercicio = <EjercicioModel> this.composeForm.getRawValue();
      ejercicio.proceso_id = this.selectedProcess.proceso_Id;
      ejercicio.fecha_creacion_ejercicio = this.data.ejercicio.fecha_creacion_ejercicio;
      ejercicio = this.mergeData(ejercicio);
      this.updateDataEjercicio(ejercicio);
    } else {
      const ejercicio = <EjercicioModel> this.composeForm.getRawValue();
      ejercicio.fecha_creacion_ejercicio = new Date().getTime();
      ejercicio.proceso_id = this.selectedProcess.proceso_Id;
      this.saveDataEjercicio(ejercicio).subscribe((x) => {
        this.customSnackMessage.openSnackBar('Ejercicio creado correctamente');
        this.dialogRef.close();
      }, (error) => {
        console.log('error', error);
      });
    }
  }

  saveDataEjercicio(ejercicio): Observable<string> {
    return this.ejercicioService.postEjercicio(ejercicio);
  }

  updateDataEjercicio(ejercicio) {
    this.ejercicioService.updateEjercicio(ejercicio).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(ejercicio);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: EjercicioModel) {
    newData.id = this.ejercicioModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      descripcion: this.ejercicioModel.descripcion,
      estatus_id: this.ejercicioModel.estatus_id
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


}
