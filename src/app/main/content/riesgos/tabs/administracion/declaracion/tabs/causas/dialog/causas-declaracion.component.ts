import {Component, Inject, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ProbabilityRiskService} from '../../../../../../../system-tables/probability/service/probability-risk.service';
import {ProbabilityRiskModel} from '../../../../../../../system-tables/probability/model/probability-risk.model';
import {CausasDeclaracionRiesgos, EfectosDeclaracionRiesgos} from '../../../../../../models/riesgos.models';
import {FormType} from '../../../../../../../commons/form-type.enum';
import {CausesRiskService} from '../../../../../../../system-tables/causes/service/causes-risk.service';
import {CausesRiskModel} from '../../../../../../../system-tables/causes/model/causes-risk.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'causas-declaracion-dialog',
  templateUrl: './causas-declaracion.component.html',
  styleUrls: ['./causas-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CausasDeclaracionComponent implements OnInit {
  restData: any;
  formErrors: any;
  composeForm: FormGroup;
  probabilidadRiesgo: ProbabilityRiskModel[];
  causasRiesgo: CausesRiskModel[];
  probabilidadSelected: ProbabilityRiskModel;
  causaSelected: CausesRiskModel;
  descripcionProbabilidad: any;
  causaNombre: any;
  probabilidadValue: number;

  causaDeclaracionAnterior: CausasDeclaracionRiesgos;

  constructor(
    private formBuilder: FormBuilder,
    private probabilityRiskService: ProbabilityRiskService,
    public dialogRef: MatDialogRef<CausasDeclaracionComponent>,
    public causesRiskService: CausesRiskService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // Reactive form errors
    this.formErrors = {
      causa: {}
    };
    this.probabilidadValue = 0;
  }

  ngOnInit() {
    this.descripcionProbabilidad = '';
    this.composeForm = this.formBuilder.group({
      causa: ['', [Validators.required]],
      descripcion: [''],
      probabilidad_riesgo_id: ['']
    });

    // Carga probabilidades
    this.probabilityRiskService.getProbabilityRisk().subscribe((data) => {
      this.probabilidadRiesgo = data;

      // Carga las causas
      this.causesRiskService.getCausesRisk().subscribe((causas) => {
        this.causasRiesgo = causas;

        if ( this.data && this.data.formType === FormType.edit ) {
          this.causaDeclaracionAnterior = this.data.causa;
          this.llenarFormulario();
        }
      });
    });
  }


  llenarFormulario() {
    this.composeForm.setValue({
      causa : this.causaDeclaracionAnterior.causa,
      descripcion : this.causaDeclaracionAnterior.descripcion,
      probabilidad_riesgo_id : this.causaDeclaracionAnterior.probabilidad_riesgo_id,
    });

    const probabilidad = this.probabilidadRiesgo.find(x => x.id === this.causaDeclaracionAnterior.probabilidad_riesgo_id);
    const causa = this.causasRiesgo.find(x => x.id === this.causaDeclaracionAnterior.causa);
    this.descripcionProbabilidad = probabilidad.descripcion;
    this.causaNombre = causa.causa_riesgo;

    this.probabilidadSelected = probabilidad;
    this.causaSelected = causa;
    this.probabilidadValue = probabilidad.puntaje;
  }

  guardarCausa() {
    const formIndfo = <CausasDeclaracionRiesgos>this.composeForm.getRawValue();
    if (this.causaDeclaracionAnterior) {
      formIndfo.id = this.causaDeclaracionAnterior.id;
      formIndfo.declaracion_riesgo_id = this.causaDeclaracionAnterior.declaracion_riesgo_id;
    }
    formIndfo.probabilidad_string = this.probabilityRiskService.getProbabilidadString(this.probabilidadSelected);
    formIndfo.causa_string = this.causaNombre;
    const values = {
      formInfo : formIndfo,
      probabilidadValue: this.probabilidadValue

    };
    this.dialogRef.close(values);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onCausasChange(itemSelect) {
    this.causaSelected = this.causasRiesgo.find(x => x.id === itemSelect.value);
    this.causaNombre = this.causaSelected.causa_riesgo;
  }

  onChange(itemSelect) {
    this.probabilidadSelected = this.probabilidadRiesgo.find(x => x.id === itemSelect.value);
    this.descripcionProbabilidad = this.probabilidadSelected.descripcion;
    this.probabilidadValue = this.probabilidadSelected.puntaje;
  }
}
