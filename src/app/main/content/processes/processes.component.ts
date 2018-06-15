import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialModule} from '../../../core/modules/material.module';
import {ProcessesService} from './services/processes.service';
import {ResponsablesService} from '../responsables/responsables.service';
import {Responsable} from '../responsables/models/responsables.model';
import {Proceso} from './models/process.model';

@Component({
  selector: 'processes-classes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit{

  responsables: Array<Responsable>;
  process: Proceso;

  @ViewChild('process') processComponent;


  constructor(private formBuilder: FormBuilder,
              private processService: ProcessesService) {

  }

  ngOnInit() {
  }

  processData() {
    const proceso = <Proceso>this.processComponent.processForm.getRawValue();
    console.log(proceso);
  }

}
