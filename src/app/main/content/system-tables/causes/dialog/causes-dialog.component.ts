import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CausesRiskModel} from '../model/causes-risk.model';
import {CausesRiskService} from '../service/causes-risk.service';

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
    if (this.data) {
      this.causesRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveImpactRisk() {
    const causesRisk = <CausesRiskModel> this.composeForm.getRawValue();
    this.saveDataImpactRisk(causesRisk);
    this.dialogRef.close(causesRisk);
  }

  saveDataImpactRisk(causesRisk) {
    this.causesRiskService.postCausesRisk(causesRisk).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
    });
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
