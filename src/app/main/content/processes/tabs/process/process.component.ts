import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Responsable} from '../../../responsables/models/responsables.model';
import {ResponsablesService} from '../../../responsables/responsables.service';
import {Observable} from 'rxjs/Observable';
import {Proceso} from '../../models/process.model';

@Component({
  selector: 'process-classes',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  fileToUpload1: File = null;
  responsables: Observable<Responsable[]>;
  processForm: FormGroup;

  @Input() process: Proceso;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private responsablesService: ResponsablesService) {
    //  this.httpclient = http;
    this.formErrors = {
      proceso_Nombre: {},
      proceso_Codigo: {},
      proceso_Tipo: {},
      proceso_Responsable_Id: {},
      proceso_Documento: {}
    };
  }

  ngOnInit() {

    this.processForm = this.formBuilder.group({
      proceso_Nombre: ['', Validators.required],
      proceso_Codigo: ['', Validators.required],
      proceso_Tipo: ['', Validators.required],
      proceso_Responsable_Id: ['', Validators.required],
      proceso_Documento: ['', Validators.required]
    });

    this.responsables = this.responsablesService.getAllResponsables();

  }
}
