import {Component, Inject, OnInit} from '@angular/core';
import {ProbabilityRiskService} from '../../../../../system-tables/probability/service/probability-risk.service';
import {ImpactRiskService} from '../../../../../system-tables/impact/service/impact-risk.service';
import {RiesgosService} from '../../../../services/riesgos.service';
import {RatingRiskService} from '../../../../../system-tables/rating/service/rating-risk.service';
import {Proceso} from '../../../../../processes/models/process.model';
import {MAT_DIALOG_DATA} from '@angular/material';
import {EjercicioModel} from '../../../ejercicios/model/ejercicio.model';

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

  constructor(private probabilityRiskService: ProbabilityRiskService,
              private impactRiskService: ImpactRiskService,
              private riesgosService: RiesgosService,
              private calificacionRiesgoService: RatingRiskService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.ejercicioModel  = this.data.ejercicio;
  }

  ngOnInit() {

    this.probabilityRiskService.getProbabilityRisk().subscribe(x => {
      this.probabilidades = x.sort(this.sortFunction).reverse();
      console.log('orden', this.probabilidades);
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
    return f.length;
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
    } if (x.puntaje > y.puntaje) {
      return 1;
    } else {
      return 0;
    }
  }

}
