/**
 * Probability Rating Model
 */
export class RatingRiskModel {
  id?: number;
  nombre_calificacion_riesgo: string;
  rango_minimo: number;
  rango_maximo: number;
  color: string;
  accion_tomar: string;

}

export class RatingRiskResponse {
  ratingRisk: RatingRiskModel;
}
