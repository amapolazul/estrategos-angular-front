import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CausesRiskModel } from '../model/causes-risk.model';

@Injectable()
export class CausesRiskService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getCausesRisk(): Observable<CausesRiskModel[]> {
    return this.http.get<CausesRiskModel[]>(this.serviceUrl + '/');
  }

  postCausesRisk(causesRiskModel: CausesRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, causesRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'causas-riesgos';
  }
}
