import {Component, Inject, OnInit} from '@angular/core';
import {ProbabilityRiskService} from '../../../../../system-tables/probability/service/probability-risk.service';
import {ImpactRiskService} from '../../../../../system-tables/impact/service/impact-risk.service';
import {RiesgosService} from '../../../../services/riesgos.service';
import {RatingRiskService} from '../../../../../system-tables/rating/service/rating-risk.service';
import {Proceso} from '../../../../../processes/models/process.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EjercicioModel} from '../../../ejercicios/model/ejercicio.model';

declare let jsPDF;

@Component({
  selector: 'probabilidad-impacto-dialog',
  templateUrl: './probabilidad-impacto-dialog.component.html',
  styleUrls: ['./probabilidad-impacto-dialog.component.scss']
})
export class ProbabilidadImpactoDialogComponent implements OnInit {

  ejercicioModel = new EjercicioModel();
  probabilidades: any[] = [];
  impactos: any[] = [];
  riesgos: any[] = [];
  calificaciones: any[] = [];
  rows = [];
  nombreEjercicio: string;
  selectedProcess: Proceso;

  constructor(private probabilityRiskService: ProbabilityRiskService,
              private impactRiskService: ImpactRiskService,
              public dialogRef: MatDialogRef<ProbabilidadImpactoDialogComponent>,
              private riesgosService: RiesgosService,
              private calificacionRiesgoService: RatingRiskService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.ejercicioModel = this.data.ejercicio;
    this.selectedProcess = this.data.proceso;
    this.nombreEjercicio = this.ejercicioModel.descripcion;
  }

  ngOnInit() {
    this.probabilityRiskService.getProbabilityRisk().subscribe(x => {
      this.probabilidades = x.sort(this.sortFunction).reverse();
      this.impactRiskService.getImpactRisk().subscribe(y => {
        this.impactos = y.sort(this.sortFunction);
        this.riesgosService.getRiesgosPorEjercicioId(this.ejercicioModel.id).subscribe(z => {
          this.riesgos = z;
          this.calificacionRiesgoService.getRatingRisk().subscribe(w => {
            this.calificaciones = w;
          });
        });
      });
    });
  }

  filtrarRiesgosPorImpactoYProbabilidad(impacto, probabilidad) {
    const f = this.riesgos.filter(x => {
      return (x.probabilidad === probabilidad.toString() && x.impacto === impacto.toString());
    });
    if (f.length > 0) {
      return '( '+f.length+' )';
    }
  }

  colorPorImpactoYProbabilidad(impacto, probabilidad) {
    const res = impacto * probabilidad;
    const calificacion = this.calificaciones.filter(x => {
      return (res <= x.rango_maximo);
    }).filter(y => {
      return (res >= y.rango_minimo);
    });
    return calificacion[0].color;
  }

  sortFunction(x, y) {
    if (x.puntaje < y.puntaje) {
      return -1;
    }
    if (x.puntaje > y.puntaje) {
      return 1;
    } else {
      return 0;
    }
  }

  download() {
    const elementToPrint = document.getElementById('probabilidadImpacto');
    elementToPrint.style.backgroundColor = 'white';
    const pdf = new jsPDF('p', 'pt', 'a4');

    const col = [
      'Riesgo',
      'Probabilidad',
      'Impacto',
      'Severidad',
      'Estado riesgo'];
    const rows = [];


    this.riesgos.forEach(x => {
      const temp = [
        x.factor_riesgo,
        x.probabilidad,
        x.impacto,
        x.severidad,
        x.estatus_riesgo_id === 1  ? 'Pendiente' : 'Mitigado'];
      rows.push(temp);
    });

    pdf.addHTML(elementToPrint, () => {
      pdf.addPage();
      pdf.autoTable(col, rows);
      pdf.save('probabilidadImpacto.pdf');
    });
  }

  getCellClass(row): any {
    return {
      'is-yellow': row.calificacion_riesgo === 'Amarillo',
      'is-green': row.calificacion_riesgo === 'Verde',
      'is-red': row.calificacion_riesgo === 'Rojo'
    };
  }

  mostrarRiesgos(impacto, probabilidad) {
    const f = this.riesgos.filter(x => {
      return (x.probabilidad === probabilidad.toString() && x.impacto === impacto.toString());
    });

    this.rows = [...f];
  }

  closeModal() {
    this.dialogRef.close();
  }

}
