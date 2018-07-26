import {Component, OnInit} from '@angular/core';
import {EjercicioService} from '../../ejercicios/service/ejercicio.service';
import {ProcessesService} from '../../../../processes/services/processes.service';
import {RiesgosService} from '../../../services/riesgos.service';
import {ActivatedRoute} from '@angular/router';
import {EjercicioModel} from '../../ejercicios/model/ejercicio.model';
import {Proceso} from '../../../../processes/models/process.model';


@Component({
  selector: 'declaracion-classes',
  templateUrl: './declaracion.component.html',
  styleUrls: ['./declaracion.component.scss']
})
export class DeclaracionComponent implements OnInit{

  ejercicioPadre: number;
  ejercicio: EjercicioModel = new EjercicioModel();
  proceso: Proceso = new Proceso();
  factorRiesgo = '';

  constructor(private riesgosService: RiesgosService,
              private activatedRoute: ActivatedRoute,
              private ejerciciosService: EjercicioService,
              private procesoService: ProcessesService) {
    this.activatedRoute.params.subscribe(x => {
      this.ejercicioPadre = x.id;
    });

  }

  ngOnInit() {
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

  actualizarFactorRiesgo(event) {
    this.factorRiesgo = event;
  }

}
