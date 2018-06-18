import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RatingRiskModel} from '../../rating/model/rating-risk.model';
import { RatingRiskService } from '../../../system-tables/rating/service/rating-risk.service';

@Component({
  selector: 'rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatingDialogComponent implements OnInit {
  showExtraToFields = false;
  restData: any;
  composeForm: FormGroup;
  ratingRiskModel = new RatingRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    private ratingRiskService: RatingRiskService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      nombre_calificacion_riesgo: [''],
      rango_minimo: [''],
      rango_maximo: [''],
      color: [''],
      accion_tomar: ['']
    });
    if (this.data) {
      this.ratingRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveRatingRisk() {
    const tipeRisk = <RatingRiskModel> this.composeForm.getRawValue();
    this.saveDataRatingRisk(tipeRisk);
    this.dialogRef.close(tipeRisk);
  }

  saveDataRatingRisk(riskTypes) {
    this.ratingRiskService.postRatingRisk(riskTypes).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
    });
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
