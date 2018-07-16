/**
 * Causes Risk Model
 */
export class ControlsRiskModel {
  id?: number;
  efectividad_nombre: string;
  puntaje: number;
  descripcion: string;
}

export class ControlsRiskResponse {
  ControlsRisk: ControlsRiskModel;
}
