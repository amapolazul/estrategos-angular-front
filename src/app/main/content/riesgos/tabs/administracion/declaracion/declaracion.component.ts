import {Component, OnInit, ViewChild} from '@angular/core';
import {EjercicioService} from '../../ejercicios/service/ejercicio.service';
import {ProcessesService} from '../../../../processes/services/processes.service';
import {RiesgosService} from '../../../services/riesgos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EjercicioModel} from '../../ejercicios/model/ejercicio.model';
import {Proceso} from '../../../../processes/models/process.model';
import {CausasDeclaracionRiesgos, ControlesDeclaracionRiesgos, DeclaracionRiesgos, DeclaracionRiesgosRequest, EfectosDeclaracionRiesgos} from '../../../models/riesgos.models';
import {CustomSnackBarMessages} from '../../../../commons/messages.service';


@Component({
  selector: 'declaracion-classes',
  templateUrl: './declaracion.component.html',
  styleUrls: ['./declaracion.component.scss']
})
export class DeclaracionComponent implements OnInit{

  ejercicioPadre: number;
  ejercicio: EjercicioModel = new EjercicioModel();
  proceso: Proceso = new Proceso();
  factorRiesgo = '';

  declaracionEditar: DeclaracionRiesgos;

  @ViewChild('declaracion') declaracion;
  @ViewChild('causas') causas;
  @ViewChild('efectos') efectos;
  @ViewChild('controles') controles;

  constructor(private riesgosService: RiesgosService,
              private activatedRoute: ActivatedRoute,
              private ejerciciosService: EjercicioService,
              private procesoService: ProcessesService,
              private customSnackMessage: CustomSnackBarMessages,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(x => {
      const lastPath = x[1];
      if (lastPath.path === 'editar') {
        this.activatedRoute.params.subscribe(y => {
          this.riesgosService.getRiesgoPorId(y.id).subscribe(z => {
            this.ejercicioPadre = z.declaracionRiesgo.ejercicio_riesgo_id;
            this.declaracionEditar = z.declaracionRiesgo;
            console.log(this.declaracionEditar);
            this.traerInformacionEjercicioProceso();
          });
        });
      }

      else {
        this.activatedRoute.params.subscribe(y => {
          this.ejercicioPadre = y.id;
          this.traerInformacionEjercicioProceso();
        });
      }
    });
  }

  traerInformacionEjercicioProceso() {
    this.ejerciciosService.getEjercicioPorId(this.ejercicioPadre).subscribe(x => {
      this.ejercicio = x;
      this.procesoService.getProcesoById(x.proceso_id).subscribe( y => {
        this.proceso = y.proceso;
      });
    });
  }

  guardarDeclaracionRiesgo() {
    const declaracionRequest = <DeclaracionRiesgos>this.declaracion.declaracionForm.getRawValue();
    declaracionRequest.proceso_id = this.proceso.proceso_Id;
    declaracionRequest.ejercicio_riesgo_id = this.ejercicioPadre;
    declaracionRequest.impacto = declaracionRequest.impacto.toString();
    declaracionRequest.probabilidad = declaracionRequest.probabilidad.toString();
    declaracionRequest.severidad = declaracionRequest.severidad.toString();
    declaracionRequest.riesgo_residual = declaracionRequest.riesgo_residual.toString();
    declaracionRequest.efectividad_controles = declaracionRequest.efectividad_controles.toString();
    declaracionRequest.fecha_creacion = new Date().getTime();
    declaracionRequest.fecha_actualizacion = new Date().getTime();
    const causasRequest = <Array<CausasDeclaracionRiesgos>>this.causas.rows;
    const efectosRequest = <Array<EfectosDeclaracionRiesgos>>this.efectos.rows;
    const controlesRequest = <Array<ControlesDeclaracionRiesgos>>this.controles.rows;

    const request = new DeclaracionRiesgosRequest(declaracionRequest, causasRequest, efectosRequest, controlesRequest);


    this.riesgosService.crearRiesgoService(request).subscribe(x => {
      this.customSnackMessage.openSnackBar('Riesgo creado correctamente');
      this.router.navigate(['administracion-riesgos', this.ejercicioPadre]);
    }, error => {
      console.log(error);
    });

  }

  actualizarValores(event) {
    this.declaracion.actualizarValores();
  }

  actualizarFactorRiesgo(event) {
    this.factorRiesgo = event;
  }

}
