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

  updateFullProcesses(procesoRequest: ProcesoCreateRequest): Observable<any> {
    return this.http.put<string>(this.serviceUrl + '/' + procesoRequest.proceso.proceso_Id, procesoRequest);
  }

  uploadProcessesFiles(files: Array<File>): Observable<any> {
    console.log(files);
    const endpoint = this.serviceUrl + '/upload';
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++){
      const fileToUpload: File = files[i];
      if (fileToUpload) {
        formData.append('fileKey', fileToUpload, fileToUpload.name);
      }
    }

    return this.http.post<string>(endpoint, formData, {});
  }

  getProcesoById(procesoId): Observable<ProcesoCreateRequest> {
    return this.http.get<ProcesoCreateRequest>(this.serviceUrl + '/' + procesoId );
  }

  getProcesos():  Observable<Proceso[]> {
    return this.http.get<Proceso[]>(this.serviceUrl);
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
