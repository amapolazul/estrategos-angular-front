import { BaseService } from '../../../commons/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RatingRiskModel } from '../model/rating-risk.model';

@Injectable()
export class RatingRiskService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getRatingRisk(): Observable<RatingRiskModel[]> {
    return this.http.get<RatingRiskModel[]>(this.serviceUrl + '/');
  }


  deleteRatingRisk(id: number): Observable<String> {
    return this.http.delete<string>(this.serviceUrl + '/' + id);
  }

  updateRatingRisk(entity: RatingRiskModel) {
    return this.http.put<string>(this.serviceUrl + '/' + entity.id, entity);
  }

  postRatingRisk(ratingRiskModel: RatingRiskModel): Observable<string> {
    return this.http.post<string>(this.serviceUrl, ratingRiskModel);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'calificacion-riesgo';
  }
}
