import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResponseRiskModel} from '../model/response-risk.model';
import {ResponseRiskService} from '../service/response-risk.service';
import {FormType} from '../../../commons/form-type.enum';
import {CustomSnackBarMessages} from '../../../commons/messages.service';


@Component({
  selector: 'response-risk-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResponseDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  responseRiskModel = new ResponseRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResponseDialogComponent>,
    private responseRiskService: ResponseRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

    // Reactive form errors
    this.formErrors = {
      respuestaRiesgoNombre: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      respuestaRiesgoNombre: ['', [Validators.required]],
      descripcion: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.responseRiskModel = this.data.responseRisk;
      this.dataForm();
    }
  }

  saveResponseRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let responseRisk = <ResponseRiskModel> this.composeForm.getRawValue();
      responseRisk = this.mergeData(responseRisk);
      this.updateDataResponseRisk(responseRisk);
      this.dialogRef.close(responseRisk);
    } else {
      const responseRisk = <ResponseRiskModel> this.composeForm.getRawValue();
      this.saveDataResponseRisk(responseRisk);
      this.dialogRef.close(responseRisk);
    }
  }

  saveDataResponseRisk(responseRisk) {
    this.responseRiskService.postResponseRisk(responseRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(responseRisk);
      this.customSnackMessage.openSnackBar(' Creado correctamente');
    });
  }

  updateDataResponseRisk(responseRisk) {
    this.responseRiskService.updateResponseRisk(responseRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(responseRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: ResponseRiskModel) {
    newData.id = this.responseRiskModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      respuestaRiesgoNombre: this.responseRiskModel.respuestaRiesgoNombre,
      descripcion: this.responseRiskModel.descripcion
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
