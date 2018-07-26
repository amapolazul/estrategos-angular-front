import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ImpactRiskService} from '../../../../../../../system-tables/impact/service/impact-risk.service';
import {Observable} from 'rxjs/Observable';
import {ImpactRiskModel} from '../../../../../../../system-tables/impact/model/impact-risk.model';
import {EfectosDeclaracionRiesgos} from '../../../../../../models/riesgos.models';

@Component({
  selector: 'efectos-declaracion-dialog',
  templateUrl: './efectos-declaracion.component.html',
  styleUrls: ['./efectos-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EfectosDeclaracionComponent implements OnInit {
  restData: any;
  impactoName: string;
  impactoValue: number;
  composeForm: FormGroup;
  impactos: ImpactRiskModel[];

  constructor(
    private formBuilder: FormBuilder,
    private impactoRiesgoService: ImpactRiskService,
    public dialogRef: MatDialogRef<EfectosDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.impactoName = '';
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      impacto: [''],
      descripcion: [''],
      impacto_riesgos_id: ['']
    });

    this.impactoRiesgoService.getImpactRisk().subscribe(response => {
      this.impactos = response;
    });
  }

  guardarEfecto() {
    const formIndfo = <EfectosDeclaracionRiesgos>this.composeForm.getRawValue();
    const values = {
      formInfo : formIndfo,
      impactoValue: this.impactoValue
    };
    this.dialogRef.close(values);
  }

  cambiarImpactoName(evento) {
    const impacto = this.impactos.find(x => x.id === evento.value);
    this.impactoName = impacto.descripcion;
    this.impactoValue = parseInt(impacto.puntaje);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
