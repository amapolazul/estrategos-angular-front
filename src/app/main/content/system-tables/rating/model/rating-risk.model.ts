/**
 * Probability Rating Model
 */
export class RatingRiskModel {
  id?: number;
  rango_minimo: string;
  rango_maximo: string;
  color_alerta: string;
  accion: string;
}

export class RatingRiskResponse {
  ratingRisk: RatingRiskModel;
}
