import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProbabilityRiskModel } from '../model/probability-risk.model';

@Injectable()
export class ProbabilityRiskService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getProbabilityRisk(): Observable<ProbabilityRiskModel[]> {
    return this.http.get<ProbabilityRiskModel[]>(this.serviceUrl + '/');
  }

  postProbabilityRisk(probabilityRiskModel: ProbabilityRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, probabilityRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'probabilidad-riesgo';
  }
}
