import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialModule} from '../../../core/modules/material.module';
import {ProcessesService} from './services/processes.service';
import {ResponsablesService} from '../responsables/responsables.service';
import {Responsable} from '../responsables/models/responsables.model';
import {Proceso, ProductoServicio} from './models/process.model';

@Component({
  selector: 'processes-classes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit{

  process: Proceso;

  @ViewChild('process') processComponent;
  @ViewChild('products') productComponent;


  constructor(private formBuilder: FormBuilder,
              private processService: ProcessesService) {

  }

  ngOnInit() {
  }

  processData() {
    const proceso = <Proceso>this.processComponent.processForm.getRawValue();
    const productsList = <Array<ProductoServicio>>this.productComponent.rows;
    console.log(productsList);
    console.log(proceso);
  }

}
