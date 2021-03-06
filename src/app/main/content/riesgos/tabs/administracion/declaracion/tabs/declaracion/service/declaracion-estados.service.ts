import {BaseService} from '../../../../../../../commons/base-service.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DeclaracionEstadoModel} from '../model/declaracion-estados.model';


@Injectable()
export class DeclaracionEstadoService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();
  }

  getDeclaracionEstados(): Observable<DeclaracionEstadoModel[]> {
    return this.http.get<DeclaracionEstadoModel[]>(this.serviceUrl + '/');
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'declaracion-estados';
  }
}
