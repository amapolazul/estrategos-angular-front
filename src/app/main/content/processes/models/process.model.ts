/**
 * Modelo que representa la entidad proceso
 */
export class Proceso {
  proceso_Id?: number;
  proceso_Padre_Id?: number;
  proceso_Nombre: string;
  proceso_Codigo: string;
  proceso_Tipo: number;
  proceso_Responsable_Id: number;
  proceso_Documento: string;
}

export class ProcesoTreeResponse {
  proceso: Proceso;
}
