import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ControlsRiskService} from '../../../../../../../system-tables/controls/service/controls-risk.service';
import {ControlsRiskModel} from '../../../../../../../system-tables/controls/model/controls-risk.model';

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

  constructor(
    private formBuilder: FormBuilder,
    private controlsRiskService: ControlsRiskService,
    public dialogRef: MatDialogRef<ControlesDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
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

  closeModal() {
    this.dialogRef.close();
  }
}
