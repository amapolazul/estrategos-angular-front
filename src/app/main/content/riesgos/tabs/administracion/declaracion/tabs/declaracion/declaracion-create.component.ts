import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'declaracion-create',
  templateUrl: './declaracion-create.component.html',
  styleUrls: ['./declaracion-create.component.scss']
})
export class DeclaracionCreateComponent implements OnInit {

  form: FormGroup;
  declaracionForm: FormGroup;

  constructor(){

  }

  ngOnInit(){

  }

}
