/**
 * Impact Risk Model
 */
export class ImpactRiskModel {
  id?: number;
  impacto: string;
  puntaje: string;
  descripcion: string;

  getImpactoString() {
    return this.impacto + ' (' + this.puntaje + ')';
  }
}

export class TypesRiskResponse {
  typesRisk: ImpactRiskModel;
}

