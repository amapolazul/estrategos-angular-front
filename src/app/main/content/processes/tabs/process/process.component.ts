import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Responsable} from '../../../responsables/models/responsables.model';
import {ResponsablesService} from '../../../responsables/responsables.service';
import {Observable} from 'rxjs/Observable';
import {Proceso} from '../../models/process.model';
import {ProcessCache} from '../../services/process-cache.service';

@Component({
  selector: 'process-classes',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  attached_file: File = null;
  responsables: Observable<Responsable[]>;
  processForm: FormGroup;

  @Output() process: Proceso;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private responsablesService: ResponsablesService,
              private processCache: ProcessCache) {
    //  this.httpclient = http;
    this.formErrors = {
      proceso_Nombre: {},
      proceso_Codigo: {},
      proceso_Tipo: {},
      proceso_Descripcion: {},
      proceso_Responsable_Id: {},
      proceso_Documento: {}
    };
  }

  ngOnInit() {

    this.processForm = this.formBuilder.group({
      proceso_Nombre: ['', Validators.required],
      proceso_Codigo: ['', Validators.required],
      proceso_Tipo: ['', Validators.required],
      proceso_Descripcion: ['', Validators.required],
      proceso_Responsable_Id: ['', Validators.required],
      proceso_Documento: ['', Validators.required]
    });

    this.responsables = this.responsablesService.getAllResponsables();

  }

  handleFileInput(files: FileList) {
    this.attached_file =  files.item(0);
    this.processForm.patchValue({
      proceso_Documento : this.attached_file.name
    });
  }

  setProcessName(event) {
    const processName = event.target.value;
    this.processCache.setProcessName(processName);
  }
}
