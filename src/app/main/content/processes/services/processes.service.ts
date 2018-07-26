import {BaseService} from '../../commons/base-service.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Proceso, ProcesoCreateRequest} from '../models/process.model';
import {Injectable} from '@angular/core';

@Injectable()
export class ProcessesService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();

  }

  createFullProcesses(procesoRequest: ProcesoCreateRequest): Observable<any> {
    return this.http.post<string>(this.serviceUrl, procesoRequest);
  }

  uploadProcessesFiles(files: Array<File>): Observable<any> {
    const endpoint = this.serviceUrl + '/upload';
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++){
      const fileToUpload: File = files[i];
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    }

    return this.http.post<string>(endpoint, formData, {});
  }

  getProcesoById(procesoId): Observable<ProcesoCreateRequest> {
    return this.http.get<ProcesoCreateRequest>(this.serviceUrl + '/' + procesoId );
  }

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
