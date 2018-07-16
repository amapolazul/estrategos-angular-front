/**
 * Response Risk Model
 */
export class ResponseRiskModel {
  id?: number;
  respuestaRiesgoNombre: string;
  descripcion: string;
}

export class ResponseRiskResponse {
  causesRisk: ResponseRiskModel;
}
