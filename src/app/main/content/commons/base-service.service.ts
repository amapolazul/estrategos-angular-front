import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseService {

  private _generalUrl = 'http://pgnstraap03:8000/';

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
  private _strategosUrl = 'http://pgnstraap03:8080/Strategosp1/home.action?defaultLoader=true';

  public getStrategosEndpoint() {
    return this._strategosUrl;
  }
}
