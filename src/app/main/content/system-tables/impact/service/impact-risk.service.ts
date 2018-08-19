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

  deleteImpactRisk(id: number): Observable<String> {
    return this.http.delete<string>(this.serviceUrl + '/' + id);
  }

  updateImpactRisk(entity: ImpactRiskModel) {
    return this.http.put<string>(this.serviceUrl + '/' + entity.id, entity);
  }

  postImpactRisk(impactRiskModel: ImpactRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, impactRiskModel);
  }

  getImpactoString(impactRiskModel: ImpactRiskModel): string {
    return impactRiskModel.impacto + ' (' + impactRiskModel.puntaje + ')';
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'impacto-riesgos';
  }
}
