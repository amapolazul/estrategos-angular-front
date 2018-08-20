import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ControlsRiskService} from '../../../../../../../system-tables/controls/service/controls-risk.service';
import {ControlsRiskModel} from '../../../../../../../system-tables/controls/model/controls-risk.model';
import {CausasDeclaracionRiesgos, ControlesDeclaracionRiesgos} from '../../../../../../models/riesgos.models';
import {FormType} from '../../../../../../../commons/form-type.enum';

@Component({
  selector: 'controles-declaracion-dialog',
  templateUrl: './controles-declaracion.component.html',
  styleUrls: ['./controles-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlesDeclaracionComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  efectividadRiesgo: ControlsRiskModel[];
  efectividadValue: number;
  descripcionEfectividad: string;
  efectividadSelected: ControlsRiskModel;

  controlDeclaracionAnterior: ControlesDeclaracionRiesgos;

  constructor(
    private formBuilder: FormBuilder,
    private controlsRiskService: ControlsRiskService,
    public dialogRef: MatDialogRef<ControlesDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.descripcionEfectividad = '';
    this.efectividadValue = 0;

    // Reactive form errors
    this.formErrors = {
      control: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      control: ['', [Validators.required]],
      descripcion: [''],
      efectividad_riesgos_id: ['']
    });

    this.controlsRiskService.getControlsRisk().subscribe((data) => {
      this.efectividadRiesgo = data;
      if ( this.data && this.data.formType === FormType.edit ) {
        this.controlDeclaracionAnterior = this.data.control;
        this.llenarFormulario();
      }
    });
  }

  llenarFormulario() {
    this.composeForm.setValue({
      control : this.controlDeclaracionAnterior.control,
      descripcion : this.controlDeclaracionAnterior.descripcion,
      efectividad_riesgos_id : this.controlDeclaracionAnterior.efectividad_riesgos_id,
    });

    const efectividad = this.efectividadRiesgo.find(x => x.id === this.controlDeclaracionAnterior.efectividad_riesgos_id);
    this.descripcionEfectividad = efectividad.descripcion;
    this.efectividadValue = efectividad.puntaje;
    this.efectividadSelected = efectividad;
  }

  guardarControl() {
    const formIndfo = <ControlesDeclaracionRiesgos>this.composeForm.getRawValue();
    if (this.controlDeclaracionAnterior) {
      formIndfo.declaracion_riesgo_id = this.controlDeclaracionAnterior.declaracion_riesgo_id;
      formIndfo.id = this.controlDeclaracionAnterior.id;
    }
    formIndfo.efectividad_declaracion_string = this.controlsRiskService.getEfectividadString(this.efectividadSelected);

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
