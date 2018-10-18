
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {BaseService} from '../../../../commons/base-service.service';

@Injectable()
export class ProductService extends BaseService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.serviceUrl = this.getResourceEndpoint();

  }

  deleteProductoServicio(productoServicioId: number): Observable<any> {
    return this.http.delete<string>(this.serviceUrl + '/' + productoServicioId);
  }

  getResourceEndpoint(): string {
    return this.generalUrl + this.getResource();
  }

  getResource(): string {
    return 'productos-servicios';
  }
}
