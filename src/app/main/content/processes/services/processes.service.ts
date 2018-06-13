import {BaseService} from '../../commons/base-service.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProcesoTreeResponse, Proceso} from '../models/process.model';
import {Injectable} from '@angular/core';

@Injectable()
export class ProcessesService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();

  }

  getSeedProcess(): Observable<ProcesoTreeResponse> {
    return this.http.get<ProcesoTreeResponse>(this.serviceUrl + '/1');
  }

  createProcesses

  getSubProcessByParentId(id): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(this.serviceUrl + '/' + id + '/sub-procesos');
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'procesos';
  }
}
