import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ControlsRiskService} from '../../../../../../../system-tables/controls/service/controls-risk.service';
import {ControlsRiskModel} from '../../../../../../../system-tables/controls/model/controls-risk.model';
import {CausasDeclaracionRiesgos, ControlesDeclaracionRiesgos} from '../../../../../../models/riesgos.models';

@Component({
  selector: 'controles-declaracion-dialog',
  templateUrl: './controles-declaracion.component.html',
  styleUrls: ['./controles-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlesDeclaracionComponent implements OnInit {
  restData: any;
  composeForm: FormGroup;
  efectividadRiesgo: ControlsRiskModel[];
  efectividadValue: number;
  descripcionEfectividad: string;
  efectividadSelected: ControlsRiskModel;

  constructor(
    private formBuilder: FormBuilder,
    private controlsRiskService: ControlsRiskService,
    public dialogRef: MatDialogRef<ControlesDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.descripcionEfectividad = '';
    this.efectividadValue = 0;
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      control: [''],
      descripcion: [''],
      efectividad_riesgos_id: ['']
    });

    this.controlsRiskService.getControlsRisk().subscribe((data) => {
      this.efectividadRiesgo = data;
      console.log(this.efectividadRiesgo);
    });
  }

  guardarControl() {
    const formIndfo = <ControlesDeclaracionRiesgos>this.composeForm.getRawValue();
    formIndfo.efectividad_declaracion_string = this.controlsRiskService.getEfectividadString(this.efectividadSelected);
    console.log(formIndfo.efectividad_declaracion_string);
    const values = {
      formInfo : formIndfo,
      efectividadValue: this.efectividadValue
    };
    this.dialogRef.close(values);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onChange(itemSelect) {
    this.efectividadSelected = this.efectividadRiesgo.find(x => x.id === itemSelect.value);
    this.descripcionEfectividad = this.efectividadSelected.descripcion;
    this.efectividadValue = this.efectividadSelected.puntaje;
  }
}
