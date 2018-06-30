import { BaseService } from '../../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {EjercicioEstatus, EjercicioModel} from '../model/ejercicio.model';

@Injectable()
export class EjercicioService extends BaseService {

  serviceUrl: string;
  serviceStatusUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
    this.serviceStatusUrl = this.getResourceStatusEndpoint();
  }

  getEjerciciosPorProceso(procesoId: number): Observable<EjercicioModel[]> {
    return this.http.get<EjercicioModel[]>(this.serviceUrl + '/procesos/' + procesoId);
  }

  getEjercicioEstados(): Observable<EjercicioEstatus[]> {
    return this.http.get<EjercicioEstatus[]>(this.serviceStatusUrl);
  }

  deleteEjercicio(id: number): Observable<String> {
    return this.http.delete<string>(this.serviceUrl + '/' + id);
  }

  updateEjercicio(entity: EjercicioModel) {
    return this.http.put<string>(this.serviceUrl + '/' + entity.id, entity);
  }

  postEjercicio(probabilityRiskModel: EjercicioModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, probabilityRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResourceStatusEndpoint(): string {
    return this.generalUrl + this.getStatusResource();
  }

  getStatusResource(): string {
    return 'ejercicio-estados';
  }

  getResource(): string {
    return 'ejercicio-riesgos';
  }
}
