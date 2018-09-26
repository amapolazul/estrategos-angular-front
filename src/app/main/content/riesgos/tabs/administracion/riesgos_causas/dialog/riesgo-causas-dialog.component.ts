import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Proceso} from '../../../../../processes/models/process.model';
import {EjercicioModel} from '../../../ejercicios/model/ejercicio.model';
import {CustomSnackBarMessages} from '../../../../../commons/messages.service';
import {RiesgosService} from '../../../../services/riesgos.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'riesgo-causas-dialog',
  templateUrl: './riesgo-causas-dialog.component.html',
  styleUrls: ['./riesgo-causas-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RiesgoCausasDialogComponent implements OnInit {
  ejercicioModel = new EjercicioModel();
  selectedProcess: Proceso;
  nombreEjercicio: string;

  view: any[] = [750, 450];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Causas';
  showYAxisLabel = true;
  yAxisLabel = 'Riesgos';

  chartData = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RiesgoCausasDialogComponent>,
    private riesgoService: RiesgosService,
    private customSnackMessage: CustomSnackBarMessages,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.selectedProcess = this.data.proceso;
    this.ejercicioModel  = this.data.ejercicio;
    this.nombreEjercicio = this.ejercicioModel.descripcion;
  }

  ngOnInit() {
    this.riesgoService.getCausasRiesgoChart(this.ejercicioModel.id).subscribe(x => {
      this.chartData = x;
    }, error => {

    });
  }


  closeModal() {
    this.dialogRef.close();
  }


}
