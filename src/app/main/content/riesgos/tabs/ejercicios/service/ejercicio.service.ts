import { BaseService } from '../../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EjercicioModel } from '../model/ejercicio.model';

@Injectable()
export class EjercicioService extends BaseService {

  serviceUrl: string;


  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getEjercicio(): Observable<EjercicioModel[]> {
    return this.http.get<EjercicioModel[]>(this.serviceUrl + '/1');
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

  getResource(): string {
    return 'ejercicio-riesgos';
  }
}
