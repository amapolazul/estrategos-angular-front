import {Injectable} from '@angular/core';

@Injectable()
export class RiesgosCalculosService {

  _probabilidadPromedio: number;
  _efectividadPromedio: number;
  _impactoPromedio: number;

  constructor(){
    this._probabilidadPromedio = 0;
    this._efectividadPromedio = 0;
    this._impactoPromedio = 0;
  }

  setProbabilidadPromedio(value: number) {
    this._probabilidadPromedio = value;
  }

  getProbabilidadPromedio() {
    return this._probabilidadPromedio;
  }

  setImpactoPromedio(value: number) {
    this._impactoPromedio = value;
  }

  getImpactoPromedio() {
    return this._impactoPromedio;
  }

  setEfectividadPromedio(value: number) {
    this._efectividadPromedio = value;
  }

  getEfectividadPromedio() {
    return this._efectividadPromedio;
  }

  calcularRiesgoResidual() {
    return (this._probabilidadPromedio * this._impactoPromedio) - this._efectividadPromedio;
  }

  calcularSeveridad(): number {
    return this._probabilidadPromedio * this._impactoPromedio;
  }

}
