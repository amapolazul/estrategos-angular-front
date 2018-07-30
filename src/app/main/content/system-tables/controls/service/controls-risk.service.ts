import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ControlsRiskModel } from '../model/controls-risk.model';

@Injectable()
export class ControlsRiskService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getControlsRisk(): Observable<ControlsRiskModel[]> {
    return this.http.get<ControlsRiskModel[]>(this.serviceUrl + '/');
  }

  deleteControlsRisk(id: number): Observable<String> {
    return this.http.delete<string>(this.serviceUrl + '/' + id);
  }

  updateControlsRisk(entity: ControlsRiskModel) {
    return this.http.put<string>(this.serviceUrl + '/' + entity.id, entity);
  }

  postControlsRisk(controlsRiskModel: ControlsRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, controlsRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'efectividad-riesgos';
  }
}
