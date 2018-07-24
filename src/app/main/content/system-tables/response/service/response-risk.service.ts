import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseRiskModel } from '../model/response-risk.model';

@Injectable()
export class ResponseRiskService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getResponseRisk(): Observable<ResponseRiskModel[]> {
    return this.http.get<ResponseRiskModel[]>(this.serviceUrl + '/');
  }

  deleteResponseRisk(id: number): Observable<String> {
    return this.http.delete<string>(this.serviceUrl + '/' + id);
  }

  updateResponseRisk(entity: ResponseRiskModel) {
    return this.http.put<string>(this.serviceUrl + '/' + entity.id, entity);
  }

  postResponseRisk(responseRiskModel: ResponseRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, responseRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'respuestas-riesgos';
  }
}
