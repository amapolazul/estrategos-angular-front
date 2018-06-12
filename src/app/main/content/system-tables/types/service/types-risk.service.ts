import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TypesRiskModel } from '../model/types-risk.model';

@Injectable()
export class TypesRiskService extends BaseService {
  TypesRiskModel
  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getTypeRisk(): Observable<TypesRiskModel[]> {
    return this.http.get<TypesRiskModel[]>(this.serviceUrl + '/');
  }

  postTypeRisk(): Observable<TypesRiskModel[]> {
    return this.http.get<TypesRiskModel[]>(this.serviceUrl + '/');
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'tipo-riesgo';
  }
}
