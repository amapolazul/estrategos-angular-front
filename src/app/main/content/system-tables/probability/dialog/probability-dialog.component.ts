import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProbabilityRiskModel} from '../../probability/model/probability-risk.model';
import {ProbabilityRiskService} from '../../probability/service/probability-risk.service';
import {CustomSnackBarMessages} from '../../../commons/messages.service';
import {FormType} from '../../../commons/form-type.enum';
import {ImpactRiskModel} from '../../impact/model/impact-risk.model';


@Component({
  selector: 'probability-dialog',
  templateUrl: './probability-dialog.component.html',
  styleUrls: ['./probability-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProbabilityDialogComponent implements OnInit {
  showExtraToFields = false;
  restData: any;
  composeForm: FormGroup;
  probabilityRiskModel = new ProbabilityRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProbabilityDialogComponent>,
    private probabilityRiskService: ProbabilityRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      probabilidad: [''],
      puntaje: [''],
      descripcion: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.probabilityRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveProbabilityRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let probabilityRisk = <ProbabilityRiskModel> this.composeForm.getRawValue();
      probabilityRisk = this.mergeData(probabilityRisk);
      this.updateDataCausesRisk(probabilityRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
      this.dialogRef.close(probabilityRisk);
    } else {
      const probabilityRisk = <ImpactRiskModel> this.composeForm.getRawValue();
      this.saveDataProbabilityRisk(probabilityRisk);
      this.customSnackMessage.openSnackBar(' Creado correctamente');
      this.dialogRef.close(probabilityRisk);
    }
  }

  saveDataProbabilityRisk(probabilityRisk) {
    this.probabilityRiskService.postProbabilityRisk(probabilityRisk).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
    });
  }

  updateDataCausesRisk(probabilityRisk) {
    this.probabilityRiskService.updateProbabilityRisk(probabilityRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(probabilityRisk);
    });
  }

  private mergeData(newData: ProbabilityRiskModel) {
    newData.id = this.probabilityRiskModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      probabilidad: this.probabilityRiskModel.probabilidad,
      puntaje: this.probabilityRiskModel.puntaje,
      descripcion: this.probabilityRiskModel.descripcion
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
