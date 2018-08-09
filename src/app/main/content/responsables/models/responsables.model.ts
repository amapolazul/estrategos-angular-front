/**
 * Modela la respuesta de responsables
 */
export class Responsable {
  responsable_id: number;
  usuario_id?: number;
  nombre: string;
  cargo: string;
  ubicacion?: string;
  email?: string;
  notas?: string;
  children_count?: number;
  tipo: number;
  grupo: number;
  organizacion_id?: number;
}
