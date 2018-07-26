import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TypesRiskModel} from '../../../../../../system-tables/types/model/types-risk.model';
import {TypesRiskService} from '../../../../../../system-tables/types/service/types-risk.service';
import {ResponseRiskModel} from '../../../../../../system-tables/response/model/response-risk.model';
import {ResponseRiskService} from '../../../../../../system-tables/response/service/response-risk.service';
import {DeclaracionEstadoModel} from './model/declaracion-estados.model';
import {DeclaracionEstadoService} from './service/declaracion-estados.service';

@Component({
  selector: 'declaracion-create',
  templateUrl: './declaracion-create.component.html',
  styleUrls: ['./declaracion-create.component.scss']
})
export class DeclaracionCreateComponent implements OnInit {

  form: FormGroup;
  declaracionForm: FormGroup;
  tipoRiesgo: TypesRiskModel[];
  respuestaRiesgo: ResponseRiskModel[];
  estadoRiesgo: DeclaracionEstadoModel[];

  constructor(private formBuilder: FormBuilder,
              private tipeRiskService: TypesRiskService,
              private responseRiskService: ResponseRiskService,
              private declaracionEstadoService: DeclaracionEstadoService) {
  }

  ngOnInit() {

    this.declaracionForm = this.formBuilder.group({
      ejercicio_riesgo_id: [''],
      tipo_riesgo_id: [''],
      respuesta_riesgo_id: [''],
      estatus_riesgo_id: [''],
      factor_riesgo: [''],
      descripcion: [''],
      probabilidad: [''],
      historico: [''],
      impacto: [''],
      severidad: [''],
      riesgo_residual: ['']
    });

    this.tipeRiskService.getTypeRisk().subscribe((data) => {
      this.tipoRiesgo = data;
      console.log(this.tipoRiesgo);
    });

    this.responseRiskService.getResponseRisk().subscribe((data) => {
      this.respuestaRiesgo = data;
      console.log(this.respuestaRiesgo);
    });

    this.declaracionEstadoService.getDeclaracionEstados().subscribe((data) => {
      this.estadoRiesgo = data;
      console.log(this.estadoRiesgo);
    });

  }

}
