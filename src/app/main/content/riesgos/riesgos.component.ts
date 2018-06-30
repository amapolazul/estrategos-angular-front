import {Component, OnInit } from '@angular/core';
import {ProcessesService} from '../processes/services/processes.service';

@Component({
  selector: 'riesgos-classes',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.scss']
})
export class RiesgosComponent implements OnInit{

  listadoRiesgos: any[];
  procesos: any[];

  constructor(private processesService: ProcessesService)
  {
  }

  ngOnInit() {
    /* EL ID del proceso esta quemado por que no existe un endpoint para listar todos los procesos : proceso_padre_id*/
    this.processesService.getSubProcessByParentId(1).subscribe((data: any) => {
        this.listadoRiesgos = data;
        console.log(this.listadoRiesgos);
    });
  }
}
