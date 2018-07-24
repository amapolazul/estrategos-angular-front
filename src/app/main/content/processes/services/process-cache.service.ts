import {Injectable} from '@angular/core';

@Injectable()
export class ProcessCache {

  private processName: string;

  setProcessName(processName) {
    this.processName = processName;
  }

  getProcessName() {
    return this.processName;
  }
}
