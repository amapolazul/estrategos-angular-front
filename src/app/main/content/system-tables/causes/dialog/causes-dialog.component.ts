import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CausesRiskModel} from '../model/causes-risk.model';
import {CausesRiskService} from '../service/causes-risk.service';
import {FormType} from '../../../commons/form-type.enum';
import {CustomSnackBarMessages} from '../../../commons/messages.service';


@Component({
  selector: 'causes-risk-dialog',
  templateUrl: './causes-dialog.component.html',
  styleUrls: ['./causes-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CausesDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  causesRiskModel = new CausesRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CausesDialogComponent>,
    private causesRiskService: CausesRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.formErrors = {
      causa_riesgo: {},
      descripcion: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      causa_riesgo: ['', [Validators.required]],
      descripcion: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.causesRiskModel = this.data.causesRisk;
      this.dataForm();
    }
  }

  saveCausesRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let causesRisk = <CausesRiskModel> this.composeForm.getRawValue();
      causesRisk = this.mergeData(causesRisk);
      this.updateDataCausesRisk(causesRisk);
      this.dialogRef.close(causesRisk);
    } else {
      const causesRisk = <CausesRiskModel> this.composeForm.getRawValue();
      this.saveDataCausesRisk(causesRisk);
      this.dialogRef.close(causesRisk);
    }
  }

  saveDataCausesRisk(causesRisk) {
    this.causesRiskService.postCausesRisk(causesRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(causesRisk);
      this.customSnackMessage.openSnackBar(' Creado correctamente');
    });
  }

  updateDataCausesRisk(causesRisk) {
    this.causesRiskService.updateCausesRisk(causesRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(causesRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: CausesRiskModel) {
    newData.id = this.causesRiskModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      causa_riesgo: this.causesRiskModel.causa_riesgo,
      descripcion: this.causesRiskModel.descripcion
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
