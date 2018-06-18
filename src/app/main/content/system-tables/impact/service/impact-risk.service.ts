import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ImpactRiskModel } from '../model/impact-risk.model';


@Injectable()
export class ImpactRiskService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getImpactRisk(): Observable<ImpactRiskModel[]> {
    return this.http.get<ImpactRiskModel[]>(this.serviceUrl + '/');
  }

  postImpactRisk(impactRiskModel: ImpactRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, impactRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'impacto-riesgos';
  }
}
