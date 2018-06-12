/**
 * Causes Risk Model
 */
export class CausesRiskModel {
  id?: number;
  causa_riesgo: string;
  descripcion: string;
}

export class CausesRiskResponse {
  causesRisk: CausesRiskModel;
}
