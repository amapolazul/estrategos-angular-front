/**
 * Impact Risk Model
 */
export class ImpactRiskModel {
  id?: number;
  imapacto: string;
  puntaje: string;
  descripcion: string;

}

export class TypesRiskResponse {
  typesRisk: ImpactRiskModel;
}
