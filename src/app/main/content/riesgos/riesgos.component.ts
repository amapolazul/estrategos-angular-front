import {Component, OnInit, ViewChild} from '@angular/core';
import {ProcessesService} from '../processes/services/processes.service';
import {Proceso} from '../processes/models/process.model';
import {EjercicioModel} from './tabs/ejercicios/model/ejercicio.model';
import {EjercicioService} from './tabs/ejercicios/service/ejercicio.service';
import {RiesgosService} from './services/riesgos.service';
import {DeclaracionRiesgos} from './models/riesgos.models';

@Component({
  selector: 'riesgos-classes',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.scss']
})
export class RiesgosComponent implements OnInit{

  listadoRiesgos: any[];
  procesos: Proceso[];
  selectedProcess: Proceso;
  ejerciciosLs: EjercicioModel[] = new Array<EjercicioModel>();
  selectedValue: number;

  @ViewChild('riesgos') riesgos;

  constructor(private processesService: ProcessesService,
              private ejercicioService: EjercicioService,
              private riesgosService: RiesgosService)
  {
  }

  ngOnInit() {
    /* EL ID del proceso esta quemado por que no existe un endpoint para listar todos los procesos : proceso_padre_id*/
    this.processesService.getSubProcessByParentId(1).subscribe((data) => {
        this.procesos = data;
    });
  }

  listEjerciciosProceso() {
    this.ejercicioService.getEjerciciosPorProceso(this.selectedProcess.proceso_Id).subscribe((data) => {
      const ejerciciosProceso = <EjercicioModel[]> data;
      this.ejerciciosLs = [...ejerciciosProceso];
    });
  }

  listRiesgosPorProceso() {
    this.riesgosService.getRiesgosPendientesPorProcesoId(this.selectedProcess.proceso_Id).subscribe((data) => {
      const riesgosProcesos = <DeclaracionRiesgos[]> data;
      this.riesgos.rows = [...riesgosProcesos];
    });
  }

  initProcesosValues(){
    const procesosFilter = this.procesos.filter(x => x.proceso_Id === this.selectedValue);
    if (procesosFilter.length === 0){
      this.ejerciciosLs = [];
      console.log('No hay proceso seleccionado');
    } else {
      this.selectedProcess = procesosFilter.pop();
      this.listEjerciciosProceso();
      this.listRiesgosPorProceso();
    }
  }
}
