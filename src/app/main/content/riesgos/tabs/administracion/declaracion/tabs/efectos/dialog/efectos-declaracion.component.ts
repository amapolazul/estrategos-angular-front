import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ImpactRiskService} from '../../../../../../../system-tables/impact/service/impact-risk.service';
import {Observable} from 'rxjs/Observable';
import {ImpactRiskModel} from '../../../../../../../system-tables/impact/model/impact-risk.model';
import {EfectosDeclaracionRiesgos} from '../../../../../../models/riesgos.models';
import {FormType} from '../../../../../../../commons/form-type.enum';

@Component({
  selector: 'efectos-declaracion-dialog',
  templateUrl: './efectos-declaracion.component.html',
  styleUrls: ['./efectos-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EfectosDeclaracionComponent implements OnInit {
  restData: any;
  formErrors: any;
  impactoName: string;
  impactoValue: number;
  composeForm: FormGroup;
  impactos: ImpactRiskModel[];
  impactoSelected: ImpactRiskModel;

  efectoDeclaracionAnterior: EfectosDeclaracionRiesgos;

  constructor(
    private formBuilder: FormBuilder,
    private impactoRiesgoService: ImpactRiskService,
    public dialogRef: MatDialogRef<EfectosDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.impactoName = '';

    // Reactive form errors
    this.formErrors = {
      impacto: {}
    };
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      impacto: ['', [Validators.required]],
      descripcion: [''],
      impacto_riesgos_id: ['']
    });

    this.impactoRiesgoService.getImpactRisk().subscribe(response => {
      this.impactos = response;
      if ( this.data && this.data.formType === FormType.edit ) {
        this.efectoDeclaracionAnterior = this.data.efecto;
        this.llenarFormulario();
      }
    });
  }

  llenarFormulario() {
    this.composeForm.setValue({
      impacto : this.efectoDeclaracionAnterior.impacto,
      descripcion : this.efectoDeclaracionAnterior.descripcion,
      impacto_riesgos_id : this.efectoDeclaracionAnterior.impacto_riesgos_id,
    });

    const impacto = this.impactos.find(x => x.id === this.efectoDeclaracionAnterior.impacto_riesgos_id);
    this.impactoName = impacto.descripcion;
    this.impactoValue =  parseInt(impacto.puntaje);
    this.impactoSelected = impacto;
  }

  guardarEfecto() {
    const formIndfo = <EfectosDeclaracionRiesgos>this.composeForm.getRawValue();
    if (this.efectoDeclaracionAnterior){
      formIndfo.declaracion_riesgo_id = this.efectoDeclaracionAnterior.declaracion_riesgo_id;
      formIndfo.id = this.efectoDeclaracionAnterior.id;
    }
    formIndfo.efecto_declaracion_string = this.impactoRiesgoService.getImpactoString(this.impactoSelected);
    const values = {
      formInfo : formIndfo,
      impactoValue: this.impactoValue
    };
    this.dialogRef.close(values);
  }

  cambiarImpactoName(evento) {
    this.impactoSelected = this.impactos.find(x => x.id === evento.value);
    this.impactoName = this.impactoSelected.descripcion;
    this.impactoValue = parseInt(this.impactoSelected.puntaje);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
