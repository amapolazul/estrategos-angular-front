import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProbabilityRiskService} from '../../../../../../../system-tables/probability/service/probability-risk.service';
import {ProbabilityRiskModel} from '../../../../../../../system-tables/probability/model/probability-risk.model';
import {CausasDeclaracionRiesgos, EfectosDeclaracionRiesgos} from '../../../../../../models/riesgos.models';

@Component({
  selector: 'causas-declaracion-dialog',
  templateUrl: './causas-declaracion.component.html',
  styleUrls: ['./causas-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CausasDeclaracionComponent implements OnInit {
  restData: any;
  composeForm: FormGroup;
  probabilidadRiesgo: ProbabilityRiskModel[];
  descripcionProbabilidad: any;
  probabilidadValue: number;

  constructor(
    private formBuilder: FormBuilder,
    private probabilityRiskService: ProbabilityRiskService,
    public dialogRef: MatDialogRef<CausasDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.probabilidadValue = 0;
  }

  ngOnInit() {
    this.descripcionProbabilidad = '';
    this.composeForm = this.formBuilder.group({
      causa: [''],
      descripcion: [''],
      probabilidad_riesgo_id: ['']
    });

    this.probabilityRiskService.getProbabilityRisk().subscribe((data) => {
      this.probabilidadRiesgo = data;
      console.log(this.probabilidadRiesgo);
    });
  }

  guardarCausa() {
    const formIndfo = <CausasDeclaracionRiesgos>this.composeForm.getRawValue();
    const values = {
      formInfo : formIndfo,
      probabilidadValue: this.probabilidadValue
    };
    this.dialogRef.close(values);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onChange(itemSelect) {
    const probabilidadRiesgo = this.probabilidadRiesgo.find(x => x.id === itemSelect.value);
    this.descripcionProbabilidad = probabilidadRiesgo.descripcion;
    this.probabilidadValue = probabilidadRiesgo.puntaje;
  }


}
