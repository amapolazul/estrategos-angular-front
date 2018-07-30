/**
 * Probability Risk Model
 */
export class EjercicioModel {
  id?: number;
  fecha_creacion_ejercicio: number;
  descripcion: string;
  proceso_id: number;
  estatus_id: number;
  estatus_nobre: string;
}

export class EjercicioEstatus {
  id: number;
  estatus: string;
}

export class EjercicioResponse {
  Ejercicio: EjercicioModel;
}
