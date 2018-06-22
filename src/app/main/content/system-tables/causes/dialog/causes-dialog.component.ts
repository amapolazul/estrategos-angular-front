import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CausesRiskModel} from '../model/causes-risk.model';
import {CausesRiskService} from '../service/causes-risk.service';
import {FormType} from '../../../commons/form-type.enum';

@Component({
  selector: 'causes-risk-dialog',
  templateUrl: './causes-dialog.component.html',
  styleUrls: ['./causes-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CausesDialogComponent implements OnInit {
  restData: any;
  composeForm: FormGroup;
  causesRiskModel = new CausesRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CausesDialogComponent>,
    private causesRiskService: CausesRiskService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }


  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      causa_riesgo: [''],
      descripcion: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.causesRiskModel = this.data.causesRisk;
      this.dataForm();
    }
  }

  saveImpactRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let causesRisk = <CausesRiskModel> this.composeForm.getRawValue();
      causesRisk = this.mergeData(causesRisk);
      this.updateDataImpactRisk(causesRisk);
    } else {
      const causesRisk = <CausesRiskModel> this.composeForm.getRawValue();
      this.saveDataImpactRisk(causesRisk);
    }
  }

  saveDataImpactRisk(causesRisk) {
    this.causesRiskService.postCausesRisk(causesRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(causesRisk);
    });
  }

  updateDataImpactRisk(causesRisk) {
    this.causesRiskService.updateCausesRisk(causesRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(causesRisk);
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
