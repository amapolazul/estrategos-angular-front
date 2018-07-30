/**
 * Impact Risk Model
 */
export class ImpactRiskModel {
  id?: number;
  impacto: string;
  puntaje: string;
  descripcion: string;

}

export class TypesRiskResponse {
  typesRisk: ImpactRiskModel;
}
