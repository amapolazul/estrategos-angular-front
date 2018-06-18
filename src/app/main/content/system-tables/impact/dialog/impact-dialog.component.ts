import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ImpactRiskService } from '../../impact/service/impact-risk.service';
import { ImpactRiskModel} from '../model/impact-risk.model';
import {ProbabilityRiskModel} from '../../probability/model/probability-risk.model';

@Component({
    selector     : 'impact-dialog',
    templateUrl  : './impact-dialog.component.html',
    styleUrls    : ['./impact-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImpactDialogComponent implements OnInit
{
    showExtraToFields = false;
    restData: any;
    composeForm: FormGroup;
    impactRiskModel = new ImpactRiskModel();


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ImpactDialogComponent>,
    private impactRiskService: ImpactRiskService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }


  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      impacto: [''],
      puntaje: [''],
      descripcion: ['']
    });
    if (this.data) {
      this.impactRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveImpactRisk() {
    const impactRisk = <ImpactRiskModel> this.composeForm.getRawValue();
    this.saveDataImpactRisk(impactRisk);
    this.dialogRef.close(impactRisk);
  }

  saveDataImpactRisk(impactRisk) {
    this.impactRiskService.postImpactRisk(impactRisk).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
    });
  }

  private dataForm() {
    this.composeForm.setValue({
      impacto: this.impactRiskModel.impacto,
      puntaje: this.impactRiskModel.puntaje,
      descripcion: this.impactRiskModel.descripcion
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


}

