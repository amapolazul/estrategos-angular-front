import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RatingRiskModel} from '../../rating/model/rating-risk.model';
import { RatingRiskService } from '../../../system-tables/rating/service/rating-risk.service';
import {CustomSnackBarMessages} from '../../../commons/messages.service';
import {FormType} from '../../../commons/form-type.enum';


@Component({
  selector: 'rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatingDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  ratingRiskModel = new RatingRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    private ratingRiskService: RatingRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // Reactive form errors
    this.formErrors = {
      nombre_calificacion_riesgo: {},
      rango_minimo: {},
      rango_maximo: {},
      accion_tomar: {},
      color: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      nombre_calificacion_riesgo: ['', [Validators.required]],
      rango_minimo: ['', [Validators.required]],
      rango_maximo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      accion_tomar: ['', [Validators.required]]
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.ratingRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveRatingRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let ratingRisk = <RatingRiskModel> this.composeForm.getRawValue();
      ratingRisk = this.mergeData(ratingRisk);
      this.updateDataRatingRisk(ratingRisk);
      this.dialogRef.close(ratingRisk);
    } else {
      const ratingRisk = <RatingRiskModel> this.composeForm.getRawValue();
      this.saveDataRatingRisk(ratingRisk);
    }
  }

  saveDataRatingRisk(ratingRisk) {
    this.ratingRiskService.postRatingRisk(ratingRisk).subscribe((data: any) => {
      this.restData = data;
      this.customSnackMessage.openSnackBar(' Creado correctamente');
      this.dialogRef.close(ratingRisk);
      console.log(this.restData);
    });
  }

  updateDataRatingRisk(ratingRisk) {
    this.ratingRiskService.updateRatingRisk(ratingRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(ratingRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: RatingRiskModel) {
    newData.id = this.ratingRiskModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      nombre_calificacion_riesgo: this.ratingRiskModel.nombre_calificacion_riesgo,
      rango_minimo: this.ratingRiskModel.rango_minimo,
      rango_maximo: this.ratingRiskModel.rango_maximo,
      color: this.ratingRiskModel.color,
      accion_tomar: this.ratingRiskModel.accion_tomar
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


}
