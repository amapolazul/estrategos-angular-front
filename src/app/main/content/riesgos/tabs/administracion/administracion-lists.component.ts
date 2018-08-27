import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RiesgosService} from '../../services/riesgos.service';
import {DeclaracionRiesgos} from '../../models/riesgos.models';
import {EjercicioService} from '../ejercicios/service/ejercicio.service';
import {EjercicioModel} from '../ejercicios/model/ejercicio.model';
import {Proceso} from '../../../processes/models/process.model';
import {ProcessesService} from '../../../processes/services/processes.service';
import {CustomSnackBarMessages} from '../../../commons/messages.service';

@Component({
    selector   : 'administracion-lists',
    templateUrl: './administracion-lists.component.html',
    styleUrls  : ['./administracion-lists.component.scss']
})
export class AdministracionListsComponent implements OnInit {
  rows = [];

  ejercicioPadre: number;
  ejercicio: EjercicioModel = new EjercicioModel();
  proceso: Proceso = new Proceso();

  constructor(private riesgosService: RiesgosService,
              private activatedRoute: ActivatedRoute,
              private ejerciciosService: EjercicioService,
              private procesoService: ProcessesService,
              private customSnackBar: CustomSnackBarMessages,
              private router: Router) {
    this.activatedRoute.params.subscribe(x => {
      this.ejercicioPadre = x.id;
    });

  }

  ngOnInit() {
    this.riesgosService.getRiesgosPorEjercicioId(this.ejercicioPadre).subscribe(x => {
      const result = <DeclaracionRiesgos[]> x;
      this.rows = [...result];
    });

    this.traerInformacionEjercicioProceso();
  }

  traerInformacionEjercicioProceso() {
    this.ejerciciosService.getEjercicioPorId(this.ejercicioPadre).subscribe(x => {
      this.ejercicio = x;
      this.procesoService.getProcesoById(x.proceso_id).subscribe( y => {
        this.proceso = y.proceso;
      });
    });
  }

  nuevoDeclaracionRiesgo() {
    this.router.navigate(['declaracion-riesgos', this.ejercicioPadre]);
  }

  delete(row, rowIndex) {
    if (row.estatus_riesgo_id === 2) {
      this.customSnackBar.openSnackBar('No es permitido borrar un riesgo en estado Mitigado');
    } else {
      this.riesgosService.borrarRiesgo(row.id).subscribe(x => {
        if (rowIndex > -1) {
          this.rows.splice(rowIndex, 1);
          this.rows = [...this.rows];
          this.customSnackBar.openSnackBar('Registro eliminado');
        }
      }, error => {
        this.customSnackBar.openSnackBar('Ha ocurrido un error borrando el riesgo');
      });
    }
  }

  edit(row, rowIndex){
    this.router.navigate(['declaracion-riesgos/editar', row.id]);
  }

  getCellClass(row): any {
    return {
      'is-yellow': row.calificacion_riesgo === 'Amarillo',
      'is-green': row.calificacion_riesgo === 'Verde',
      'is-red': row.calificacion_riesgo === 'Rojo'
    };
  }
}
