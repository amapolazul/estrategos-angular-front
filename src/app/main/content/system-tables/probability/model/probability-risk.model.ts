/**
 * Probability Risk Model
 */
export class ProbabilityRiskModel {
  id?: number;
  probabilidad: string;
  puntaje: number;
  descripcion: string;
}

export class ProbabilityRiskResponse {
  probabilityRisk: ProbabilityRiskModel;
}
