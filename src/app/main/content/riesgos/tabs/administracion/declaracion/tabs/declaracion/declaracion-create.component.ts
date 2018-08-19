import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {TypesRiskModel} from '../../../../../../system-tables/types/model/types-risk.model';
import {TypesRiskService} from '../../../../../../system-tables/types/service/types-risk.service';
import {ResponseRiskModel} from '../../../../../../system-tables/response/model/response-risk.model';
import {ResponseRiskService} from '../../../../../../system-tables/response/service/response-risk.service';
import {DeclaracionEstadoModel} from './model/declaracion-estados.model';
import {DeclaracionEstadoService} from './service/declaracion-estados.service';
import {EjercicioModel} from '../../../../ejercicios/model/ejercicio.model';
import {RiesgosCalculosService} from '../../../../../services/riesgos-calculos.service';
import {DeclaracionRiesgos} from '../../../../../models/riesgos.models';

@Component({
  selector: 'declaracion-create',
  templateUrl: './declaracion-create.component.html',
  styleUrls: ['./declaracion-create.component.scss']
})
export class DeclaracionCreateComponent implements OnInit, OnChanges{

  form: FormGroup;
  declaracionForm: FormGroup;
  tipoRiesgo: TypesRiskModel[];
  respuestaRiesgo: ResponseRiskModel[];
  estadoRiesgo: DeclaracionEstadoModel[];

  @Input() ejercicioSeleccionado: EjercicioModel;
  @Input() declaracionRiesgoInput: DeclaracionRiesgos;
  @Output() cambiarFactorRiesgo = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder,
              private tipeRiskService: TypesRiskService,
              private responseRiskService: ResponseRiskService,
              private declaracionEstadoService: DeclaracionEstadoService,
              private riesgosCalculosService: RiesgosCalculosService) {
  }

  ngOnInit() {

    this.declaracionForm = this.formBuilder.group({
      tipo_riesgo_id: [''],
      respuesta_riesgo_id: [''],
      estatus_riesgo_id: [''],
      factor_riesgo: [''],
      descripcion: [''],
      efectividad_controles: [{value: '', disabled: true}],
      probabilidad: [{value: '', disabled: true}],
      historico: [false],
      impacto: [{value: '', disabled: true}],
      severidad: [{value: '', disabled: true}],
      riesgo_residual: [{value: '', disabled: true}]
    });

    this.tipeRiskService.getTypeRisk().subscribe((data) => {
      this.tipoRiesgo = data;
      console.log(this.tipoRiesgo);
    });

    this.responseRiskService.getResponseRisk().subscribe((data) => {
      this.respuestaRiesgo = data;
    });

    this.declaracionEstadoService.getDeclaracionEstados().subscribe((data) => {
      this.estadoRiesgo = data;
    });

    console.log(this.declaracionRiesgoInput);
  }

  ngOnChanges() {
    if (this.declaracionRiesgoInput) {
      this.llenarFormulario();
    }
  }

  llenarFormulario(){
    this.declaracionForm.setValue({
      tipo_riesgo_id: this.declaracionRiesgoInput.tipo_riesgo_id,
      respuesta_riesgo_id: this.declaracionRiesgoInput.respuesta_riesgo_id,
      estatus_riesgo_id: this.declaracionRiesgoInput.estatus_riesgo_id,
      factor_riesgo: this.declaracionRiesgoInput.factor_riesgo,
      descripcion: this.declaracionRiesgoInput.descripcion,
      efectividad_controles: this.declaracionRiesgoInput.efectividad_controles,
      probabilidad: this.declaracionRiesgoInput.probabilidad,
      historico: this.declaracionRiesgoInput.historico,
      impacto: this.declaracionRiesgoInput.impacto,
      severidad: this.declaracionRiesgoInput.severidad,
      riesgo_residual: this.declaracionRiesgoInput.riesgo_residual
    });
  }

  actualizarValores(event) {
    this.declaracionForm.controls['efectividad_controles'].setValue(this.riesgosCalculosService.getEfectividadPromedio());
    this.declaracionForm.controls['efectividad_controles'].disable();
    this.declaracionForm.controls['probabilidad'].setValue(this.riesgosCalculosService.getProbabilidadPromedio());
    this.declaracionForm.controls['probabilidad'].disable();
    this.declaracionForm.controls['impacto'].setValue(this.riesgosCalculosService.getImpactoPromedio());
    this.declaracionForm.controls['impacto'].disable();
    this.declaracionForm.controls['severidad'].setValue(this.riesgosCalculosService.calcularSeveridad());
    this.declaracionForm.controls['severidad'].disable();
    this.declaracionForm.controls['riesgo_residual'].setValue(this.riesgosCalculosService.calcularRiesgoResidual());
    this.declaracionForm.controls['riesgo_residual'].disable();
  }

  actualizarFactorRiesgo(event) {
    this.cambiarFactorRiesgo.next(event.target.value);
  }
}
