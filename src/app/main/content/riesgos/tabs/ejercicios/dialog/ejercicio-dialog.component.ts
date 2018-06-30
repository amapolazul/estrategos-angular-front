import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EjercicioModel} from '../model/ejercicio.model';
import {EjercicioService} from '../service/ejercicio.service';
import {CustomSnackBarMessages} from '../../../../commons/messages.service';
import {FormType} from '../../../../commons/form-type.enum';


@Component({
  selector: 'ejercicio-dialog',
  templateUrl: './ejercicio-dialog.component.html',
  styleUrls: ['./ejercicio-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EjercicioDialogComponent implements OnInit {
  restData: any;
  composeForm: FormGroup;
  ejercicioModel = new EjercicioModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EjercicioDialogComponent>,
    private ejercicioService: EjercicioService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      fecha_creacion: [''],
      descripcion_ejercicio: [''],
      estatus: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.ejercicioModel = this.data.product;
      this.dataForm();
    }
  }

  saveEjercicio() {
    if (this.data && this.data.formType === FormType.edit) {
      let ratingRisk = <EjercicioModel> this.composeForm.getRawValue();
      ratingRisk = this.mergeData(ratingRisk);
      this.updateDataEjercicio(ratingRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
      this.dialogRef.close(ratingRisk);
    } else {
      const ratingRisk = <EjercicioModel> this.composeForm.getRawValue();
      this.saveDataEjercicio(ratingRisk);
      this.customSnackMessage.openSnackBar(' Creado correctamente');
      this.dialogRef.close(ratingRisk);
    }
  }

  saveDataEjercicio(ratingRisk) {
    this.ejercicioService.postEjercicio(ratingRisk).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
    });
  }

  updateDataEjercicio(ratingRisk) {
    this.ejercicioService.updateEjercicio(ratingRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(ratingRisk);
    });
  }

  private mergeData(newData: EjercicioModel) {
    newData.id = this.ejercicioModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      fecha_creacion: this.ejercicioModel.fecha_creacion,
      descripcion_ejercicio: this.ejercicioModel.descripcion_ejercicio,
      estatus: this.ejercicioModel.estatus
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


}
