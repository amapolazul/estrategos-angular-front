import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseService {

  //private _generalUrl = 'http://52.4.220.100:9000/';
  private _generalUrl = 'http://localhost:9000/';
  //private _generalUrl = 'http://PGNSTRAAP03:9000/';

  constructor() {
  }

  public abstract getResource(): string;

  public abstract getResourceEndpoint(): String;

  protected get generalUrl(): string {
    return this._generalUrl;
  }
}

@Injectable()
export class StrategosEndpointService {
  private _strategosUrl = 'http://PGNSTRAAP03:8080';

  public getStrategosEndpoint() {
    return this._strategosUrl;
  }
}
