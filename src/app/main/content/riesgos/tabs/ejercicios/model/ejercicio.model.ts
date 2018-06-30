/**
 * Probability Risk Model
 */
export class EjercicioModel {
  id?: number;
  fecha_creacion: string;
  descripcion_ejercicio: string;
  estatus: string;
}

export class EjercicioResponse {
  Ejercicio: EjercicioModel;
}
