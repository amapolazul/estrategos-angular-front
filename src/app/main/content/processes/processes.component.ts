import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProcessesService} from './services/processes.service';
import {Caracterizacion, Proceso, ProcesoCreateRequest, ProductoServicio} from './models/process.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomSnackBarMessages} from '../commons/messages.service';
import {Observable} from 'rxjs/Observable';
import {flatMap} from 'rxjs/operators';

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
              private activatedRoute: ActivatedRoute,
              private customSnackMessage: CustomSnackBarMessages,
              private router: Router) {

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

    const totalDocuments: Array<File> = new Array();
    if (this.processComponent.attached_file != null) {
      totalDocuments.push(this.processComponent.attached_file);
    }

    caracterizacionesList.forEach((caracterizacion) => {
      caracterizacion.documentosCaracterizacion.forEach((doc) => {
        totalDocuments.push(doc.attached_file);
      });
    });

    const processRequest = this.createProcessesRequest(proceso, productsList, caracterizacionesList);
    if (totalDocuments.length > 0) {

      const result = Observable.merge(
        this.processService.uploadProcessesFiles(totalDocuments),
        this.processService.createFullProcesses(processRequest)
      );

      result.subscribe(x => {
        this.customSnackMessage.openSnackBar('Proceso creado correctamente');
        this.router.navigate(['home']);
      }, (error) => {
        console.log('Error');
      });

    } else {
      this.processService.createFullProcesses(processRequest).subscribe((x) => {
        this.customSnackMessage.openSnackBar('Proceso creado correctamente');
        this.router.navigate(['home']);
      });
    }




  }

  private createProcessesRequest(processes: Proceso, products: ProductoServicio[], charact: Caracterizacion[]) {
    return new ProcesoCreateRequest(processes, products, charact);
  }

}
