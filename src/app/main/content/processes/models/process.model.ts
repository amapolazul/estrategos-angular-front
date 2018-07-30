/**
 * Modelo que representa la entidad proceso
 */
export class Proceso {
  proceso_Id?: number;
  proceso_Padre_Id?: number;
  proceso_Nombre: string;
  proceso_Descripcion: string;
  proceso_Codigo: string;
  proceso_Tipo: number;
  proceso_Responsable_Id: number;
  proceso_Documento: string;
}

export class ProductoServicio {
  producto_Servicio_Id?: number;
  proceso_Id?: number;
  proceso_Nombre: string;
  producto_Servicio_Codigo: string;
  producto_Servicio_nombre: string;
  producto_Caracteristicas: string;
}

export class Caracterizacion {
  caraceterizacion_id?: number;
  proceso_Id?: number;
  procedimiento_Nombre: string;
  procedimiento_Codigo: string;
  procedimiento_Objetivo: string;
  documentosCaracterizacion: Array<DocumentoCaracterizacion> = [];

}

export class DocumentoCaracterizacion {
  procedimiento_Documento_Id?: number;
  caraceterizacion_id: number;
  procedimiento_Documento_Nombre: string;
  procedimiento_Documento_Descripcion: string;
  procedimiento_Documento_Codigo: string;
  procedimiento_Documento_Arch: string;
  attached_file: File;
}

export class ProcesoCreateRequest {
  proceso: Proceso;
  productoServicios: Array<ProductoServicio>;
  caracterizaciones: Array<Caracterizacion>;

  constructor(proceso: Proceso,
              productoServicios: Array<ProductoServicio>,
              caracterizaciones: Array<Caracterizacion>) {
    this.proceso = proceso;
    this.productoServicios = productoServicios;
    this.caracterizaciones = caracterizaciones;
  }
}

export class ProcesoTreeResponse {
  proceso: Proceso;
}
