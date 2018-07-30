import {BaseService} from '../commons/base-service.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Responsable} from './models/responsables.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ResponsablesService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();

  }

  /**
   * Retorna un observable con la lista de responsables
   * @returns {Observable<Responsable[]>}
   */
  getAllResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.serviceUrl);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'responsable';
  }
}
