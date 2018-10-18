import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {TypesRiskModel} from '../model/types-risk.model';
import {TypesRiskService} from '../../../system-tables/types/service/types-risk.service';
import {CustomSnackBarMessages} from '../../../commons/messages.service';
import {FormType} from '../../../commons/form-type.enum';


@Component({
  selector: 'types-dialog',
  templateUrl: './types-dialog.component.html',
  styleUrls: ['./types-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TypesDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  typesRiskModel = new TypesRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TypesDialogComponent>,
    private typesRiskService: TypesRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

    // Reactive form errors
    this.formErrors = {
      tipo_riesgo: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      tipo_riesgo: ['', [Validators.required]]
    });
    if (this.data) {
      this.typesRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveRisk() {
    console.log(this.composeForm.value);
    if (this.data && this.data.formType === FormType.edit) {
      let tipeRisk = <TypesRiskModel> this.composeForm.getRawValue();
      tipeRisk = this.mergeData(tipeRisk);
      this.updateTypeRisk(tipeRisk);
      this.dialogRef.close(tipeRisk);
    } else {
      const tipeRisk = <TypesRiskModel> this.composeForm.getRawValue();
      this.saveTypeRisk(tipeRisk);
      this.dialogRef.close(tipeRisk);
    }
  }

  saveTypeRisk(riskTypes) {
    this.typesRiskService.postTypeRisk(riskTypes).subscribe((data: any) => {
      this.restData = data;
      console.log(this.restData);
      this.customSnackMessage.openSnackBar(' Creado correctamente');
    });
  }

  updateTypeRisk(riskTypes) {
    this.typesRiskService.updateTypeRisk(riskTypes).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(riskTypes);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: TypesRiskModel) {
    newData.id = this.typesRiskModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      tipo_riesgo: this.typesRiskModel.tipo_riesgo
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


}
