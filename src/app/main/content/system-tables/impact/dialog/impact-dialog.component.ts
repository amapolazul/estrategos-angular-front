import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ImpactRiskService} from '../../impact/service/impact-risk.service';
import {ImpactRiskModel} from '../model/impact-risk.model';
import {FormType} from '../../../commons/form-type.enum';
import {CustomSnackBarMessages} from '../../../commons/messages.service';


@Component({
  selector: 'impact-dialog',
  templateUrl: './impact-dialog.component.html',
  styleUrls: ['./impact-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImpactDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  impactRiskModel = new ImpactRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ImpactDialogComponent>,
    private impactRiskService: ImpactRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.formErrors = {
      impacto: {},
      puntaje: {},
      descripcion: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      impacto:  ['', [Validators.required]],
      puntaje:  ['', [Validators.required]],
      descripcion: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.impactRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveImpactRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let impactRisk = <ImpactRiskModel> this.composeForm.getRawValue();
      impactRisk = this.mergeData(impactRisk);
      this.updateDataCausesRisk(impactRisk);
      this.dialogRef.close(impactRisk);
    } else {
      const impactRisk = <ImpactRiskModel> this.composeForm.getRawValue();
      this.saveDataImpactRisk(impactRisk);
      this.dialogRef.close(impactRisk);
    }
  }

  saveDataImpactRisk(impactRisk) {
    this.impactRiskService.postImpactRisk(impactRisk).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
      this.dialogRef.close(impactRisk);
      this.customSnackMessage.openSnackBar(' Creado correctamente');
    });
  }

  updateDataCausesRisk(impactRisk) {
    this.impactRiskService.updateImpactRisk(impactRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(impactRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: ImpactRiskModel) {
    newData.id = this.impactRiskModel.id;
    return newData;
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

