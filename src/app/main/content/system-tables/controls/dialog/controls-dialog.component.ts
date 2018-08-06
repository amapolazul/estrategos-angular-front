import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ControlsRiskModel} from '../model/controls-risk.model';
import {ControlsRiskService} from '../service/controls-risk.service';
import {FormType} from '../../../commons/form-type.enum';
import {CustomSnackBarMessages} from '../../../commons/messages.service';


@Component({
  selector: 'controls-risk-dialog',
  templateUrl: './controls-dialog.component.html',
  styleUrls: ['./controls-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlsDialogComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  controlsRiskModel = new ControlsRiskModel();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ControlsDialogComponent>,
    private controlsRiskService: ControlsRiskService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.formErrors = {
      efectividad_nombre: {},
      puntaje: {},
      descripcion: {}
    };
  }


  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      efectividad_nombre: ['', [Validators.required]],
      puntaje : ['', [Validators.required]],
      descripcion: ['']
    });
    if (this.data && this.data.formType === FormType.edit) {
      this.controlsRiskModel = this.data.controlsRisk;
      this.dataForm();
    }
  }

  saveControlsRisk() {
    if (this.data && this.data.formType === FormType.edit) {
      let controlsRisk = <ControlsRiskModel> this.composeForm.getRawValue();
      controlsRisk = this.mergeData(controlsRisk);
      this.updateDataControlsRisk(controlsRisk);
      this.dialogRef.close(controlsRisk);
    } else {
      const controlsRisk = <ControlsRiskModel> this.composeForm.getRawValue();
      this.saveDataControlsRisk(controlsRisk);
      this.dialogRef.close(controlsRisk);
    }
  }

  saveDataControlsRisk(controlsRisk) {
    this.controlsRiskService.postControlsRisk(controlsRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(controlsRisk);
      this.customSnackMessage.openSnackBar('Nivel creado correctamente');
    });
  }

  updateDataControlsRisk(controlsRisk) {
    this.controlsRiskService.updateControlsRisk(controlsRisk).subscribe((data: any) => {
      this.restData = data;
      this.dialogRef.close(controlsRisk);
      this.customSnackMessage.openSnackBar(' Editado correctamente');
    });
  }

  private mergeData(newData: ControlsRiskModel) {
    newData.id = this.controlsRiskModel.id;
    return newData;
  }

  private dataForm() {
    this.composeForm.setValue({
      efectividad_nombre: this.controlsRiskModel.efectividad_nombre,
      puntaje: this.controlsRiskModel.puntaje,
      descripcion: this.controlsRiskModel.descripcion
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
