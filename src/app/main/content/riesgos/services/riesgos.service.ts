import {BaseService} from '../../commons/base-service.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {DeclaracionRiesgos, DeclaracionRiesgosCausa, DeclaracionRiesgosRequest} from '../models/riesgos.models';

@Injectable()
export class RiesgosService extends BaseService {

  serviceUrl: string;
  serviceStatusUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
    this.serviceStatusUrl = this.getResourceStatusEndpoint();
  }

  crearRiesgoService(request: DeclaracionRiesgosRequest): Observable<number> {
    return this.http.post<number>(this.serviceUrl, request);
  }

  actualizarRiesgoService(request: DeclaracionRiesgosRequest): Observable<number> {
    return this.http.put<number>(this.serviceUrl + '/' + request.declaracionRiesgo.id , request);
  }

  borrarRiesgo(riesgoId: number): Observable<any> {
    return this.http.delete(this.serviceUrl + '/' + riesgoId);
  }

  getRiesgosPendientesPorProcesoId(procesoId: number): Observable<DeclaracionRiesgos[]> {
    return this.http.get<DeclaracionRiesgos[]>(this.serviceUrl + '?procesoId=' + procesoId);
  }

  getRiesgosPorEjercicioId(ejercicioId: number):  Observable<DeclaracionRiesgos[]> {
    return this.http.get<DeclaracionRiesgos[]>(this.serviceUrl + '?ejercicioId=' + ejercicioId);
  }

  getRiesgoPorId(riesgoId: number): Observable<DeclaracionRiesgosRequest> {
    return this.http.get<DeclaracionRiesgosRequest>(this.serviceUrl + '/' + riesgoId);
  }

  getCausasRiesgoChart(ejercicioId: number): Observable<DeclaracionRiesgosCausa[]> {
    return this.http.get<DeclaracionRiesgosCausa[]>(this.serviceUrl + '/charts/causas?ejercicioId=' + ejercicioId);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResourceStatusEndpoint(): string {
    return this.generalUrl + this.getStatusResource();
  }

  getStatusResource(): string {
    return 'declaracion-estados';
  }

  getResource(): string {
    return 'declaracion-riesgos';
  }

}
