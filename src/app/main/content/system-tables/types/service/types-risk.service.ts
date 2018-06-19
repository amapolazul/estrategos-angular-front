import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TypesRiskModel, TypesRiskResponse} from '../model/types-risk.model';

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

  postTypeRisk(typeRisk: TypesRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, typeRisk);
  }

  deleteTypeRisk(typeRisk) {
    return this.http.delete(this.serviceUrl + '/?' + typeRisk).map((response: Response) => response.json());
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'tipo-riesgo';
  }
}
