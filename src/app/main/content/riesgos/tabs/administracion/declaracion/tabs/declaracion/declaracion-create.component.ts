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

  constructor(private tipeRiskService: TypesRiskService,
              private responseRiskService: ResponseRiskService,
              private declaracionEstadoService: DeclaracionEstadoService) {

  }

  ngOnInit() {

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
