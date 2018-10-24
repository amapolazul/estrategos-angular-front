import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Proceso} from '../../../../../processes/models/process.model';
import {EjercicioModel} from '../../../ejercicios/model/ejercicio.model';
import {CustomSnackBarMessages} from '../../../../../commons/messages.service';
import {RiesgosService} from '../../../../services/riesgos.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {DeclaracionRiesgos} from '../../../../models/riesgos.models';
declare let jsPDF;


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

  rows = [];

  view: any[] = [700, 500];
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
  yScaleMax = 400;
  YScaleMin = 400;

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

    this.riesgoService.getRiesgosPorEjercicioId(this.ejercicioModel.id).subscribe(x => {
      const result = <DeclaracionRiesgos[]> x;
      this.rows = [...result];
    });
  }

  download() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const htmlElement = document.getElementById('chart-container');
    htmlElement.style.backgroundColor = 'white';
    htmlElement.style.margin = '60px';

    const col = [
      'Riesgo',
      'Probabilidad',
      'Impacto',
      'Severidad',
      'Estado riesgo'];
    const rows = [];

    this.rows.forEach(x => {
      const temp = [
        x.factor_riesgo,
        x.probabilidad,
        x.impacto,
        x.severidad,
        x.estatus_riesgo_id === 1  ? 'Pendiente' : 'Mitigado'] ;
      rows.push(temp);
    });

    pdf.addHTML(htmlElement, () => {
      pdf.addPage();
      pdf.autoTable(col, rows,{
        margin: {horizontal: 5},
        bodyStyles: { valign: 'top' },
        styles: { overflow: 'linebreak', columnWidth: 'wrap' },
        columnStyles: {text: {columnWidth: 'auto'}}
      });
      pdf.save('riesposPorCausas.pdf');
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


}
