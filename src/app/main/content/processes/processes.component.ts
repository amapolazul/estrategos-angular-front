import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProcessesService} from './services/processes.service';
import {Caracterizacion, Proceso, ProcesoCreateRequest, ProductoServicio} from './models/process.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomSnackBarMessages} from '../commons/messages.service';
import {Observable} from 'rxjs/Observable';
import {flatMap} from 'rxjs/operators';
import {ProcessCache} from './services/process-cache.service';

@Component({
  selector: 'processes-classes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit{

  process: Proceso;
  parentProcessId: number;

  procesoEditar: Proceso;
  productosServiciosEditar: ProductoServicio[];
  caracterizacionesEditar: Caracterizacion[];

  isEditingProcesosForm = false;

  @ViewChild('procesos') processComponent;
  @ViewChild('productos') productComponent;
  @ViewChild('caracterizaciones') caracterizacionesComponent;


  constructor(private formBuilder: FormBuilder,
              private processService: ProcessesService,
              private activatedRoute: ActivatedRoute,
              private customSnackMessage: CustomSnackBarMessages,
              private processCache: ProcessCache,
              private router: Router) {

    this.activatedRoute.url.subscribe(path => {
      const lastPath = path[1];
      if (lastPath.path === 'editar') {
        this.isEditingProcesosForm = true;
        this.activatedRoute.params.subscribe(procesoId => {
          this.processService.getProcesoById(procesoId.id).subscribe(proceso => {
            this.procesoEditar = proceso.proceso;
            this.productosServiciosEditar = proceso.productoServicios;
            this.caracterizacionesEditar = proceso.caracterizaciones;

            this.processCache.setProcessName(this.procesoEditar.proceso_Nombre);
          });
        });
      } else {
        this.activatedRoute.params.subscribe(x => {
          this.parentProcessId = x.id;
        });
      }
    });
  }

  ngOnInit() {
  }

  processData() {
    if (this.processComponent.processForm.valid){
      const proceso = <Proceso>this.processComponent.processForm.getRawValue();
      if (this.isEditingProcesosForm) {
        proceso.proceso_Padre_Id =  this.procesoEditar.proceso_Padre_Id;
        proceso.proceso_Id = this.procesoEditar.proceso_Id;
      } else {
        proceso.proceso_Padre_Id =  this.parentProcessId;
      }

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

        let result;

        if (this.isEditingProcesosForm) {
          result = Observable.merge(
            this.processService.uploadProcessesFiles(totalDocuments),
            this.processService.updateFullProcesses(processRequest)
          );
          result.subscribe(x => {
            this.customSnackMessage.openSnackBar('Proceso actualizado correctamente');
            this.router.navigate(['home']);
          }, (error) => {
            this.customSnackMessage.openSnackBar('Ha ocurrido un error cargando archivos del proceso. ' + error.message);
          });
        } else {
          result = Observable.merge(
            this.processService.uploadProcessesFiles(totalDocuments),
            this.processService.createFullProcesses(processRequest)
          );
          result.subscribe(x => {
            this.customSnackMessage.openSnackBar('Proceso creado correctamente');
            this.router.navigate(['home']);
          }, (error) => {
            this.customSnackMessage.openSnackBar('Ha ocurrido un error cargando archivos del proceso. ' + error.message);
          });
        }

      } else {
        if (this.isEditingProcesosForm) {
          this.processService.updateFullProcesses(processRequest).subscribe((x) => {
            this.customSnackMessage.openSnackBar('Proceso actualizado correctamente');
            this.router.navigate(['home']);
          }, error => {

            this.customSnackMessage.openSnackBar('Ha ocurrido un error creando el proceso . ' + error.message);
          });
        } else {
          this.processService.createFullProcesses(processRequest).subscribe((x) => {
            this.customSnackMessage.openSnackBar('Proceso creado correctamente');
            this.router.navigate(['home']);
          }, error => {
            this.customSnackMessage.openSnackBar('Ha ocurrido un error creando el proceso.. ' + error.message);
          });
        }
      }
    } else {
      this.customSnackMessage.openSnackBar('Por favor llene los campos del formulario correctamente.');
    }
  }

  private createProcessesRequest(processes: Proceso, products: ProductoServicio[], charact: Caracterizacion[]) {
    return new ProcesoCreateRequest(processes, products, charact);
  }

}
