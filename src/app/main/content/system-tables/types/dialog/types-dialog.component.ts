import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TypesRiskModel } from '../model/types-risk.model';
import {FormType} from '../../../commons/form-type.enum';


@Component({
  selector: 'types-dialog',
  templateUrl: './types-dialog.component.html',
  styleUrls: ['./types-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TypesDialogComponent implements OnInit {
  showExtraToFields = false;
  composeForm: FormGroup;
  typesRiskModel = new TypesRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      tipo_riesgo: ['']
    });
    if ( this.data ) {
      this.typesRiskModel = this.data.product;
      this.dataForm();
    }
  }

  saveRisk() {
    const tipeRisk = <TypesRiskModel> this.composeForm.getRawValue();
    this.dialogRef.close(tipeRisk);
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
