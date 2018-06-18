import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialModule} from '../../../core/modules/material.module';
import {ProcessesService} from './services/processes.service';
import {ResponsablesService} from '../responsables/responsables.service';
import {Responsable} from '../responsables/models/responsables.model';
import {Caracterizacion, Proceso, ProcesoCreateRequest, ProductoServicio} from './models/process.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'processes-classes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit{

  process: Proceso;
  parentProcessId: number;

  @ViewChild('procesos') processComponent;
  @ViewChild('productos') productComponent;
  @ViewChild('caracterizaciones') caracterizacionesComponent;


  constructor(private formBuilder: FormBuilder,
              private processService: ProcessesService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(x => {
      this.parentProcessId = x.id;
    });

  }

  ngOnInit() {
  }

  processData() {
    const proceso = <Proceso>this.processComponent.processForm.getRawValue();
    proceso.proceso_Padre_Id =  this.parentProcessId;
    const productsList = <Array<ProductoServicio>>this.productComponent.rows;
    const caracterizacionesList = <Array<Caracterizacion>>this.caracterizacionesComponent.rows;

    const processRequest = this.createProcessesRequest(proceso, productsList, caracterizacionesList);

    this.processService.createFullProcesses(processRequest).subscribe((x) => {
      console.log('guardado correctamente');
    });
    console.log(processRequest);
  }

  private createProcessesRequest(processes: Proceso, products: ProductoServicio[], charact: Caracterizacion[]) {
    return new ProcesoCreateRequest(processes, products, charact);
  }

}
