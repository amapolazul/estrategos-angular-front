export class DeclaracionRiesgos {
  id?: number;
  proceso_id: number;
  ejercicio_riesgo_id: number;
  tipo_riesgo_id: number;
  respuesta_riesgo_id: number;
  estatus_riesgo_id: number;
  factor_riesgo: string;
  descripcion: string;
  efectividad_controles: string;
  probabilidad: string;
  historico: string;
  impacto: string;
  severidad: string;
  riesgo_residual: string;
  fecha_creacion: number;
  fecha_actualizacion: number;
  fecha_ejercicio: number;
}

export class EstatusRiesgos {
  id: number;
  estatus_riesgo_nombre: string;
}

export class CausasDeclaracionRiesgos {
  id?: number;
  probabilidad_riesgo_id: number;
  declaracion_riesgo_id?: number;
  causa: number;
  descripcion: string;
  probabilidad_string?: string;
  causa_string?: string;
}

export class EfectosDeclaracionRiesgos {
  id?: number;
  impacto_riesgos_id: number;
  declaracion_riesgo_id?: number ;
  impacto: string;
  descripcion: string;
  efecto_declaracion_string?: string;
}

export class ControlesDeclaracionRiesgos {
  id?: number;
  efectividad_riesgos_id: number;
  declaracion_riesgo_id?: number;
  control: string;
  descripcion: string;
  efectividad_declaracion_string: string;
}

export class DeclaracionRiesgosRequest {
  declaracionRiesgo: DeclaracionRiesgos;
  causasDeclaracionRiesgo: CausasDeclaracionRiesgos[];
  efectosDeclaracionRiesgo: EfectosDeclaracionRiesgos[];
  controlesDeclaracionRiesgo: ControlesDeclaracionRiesgos[];
  causasEliminar?: number[];
  efectosEliminar?: number[];
  controlesEliminar?: number[];

  constructor(declaracionRiesgoParam,
  causasDeclaracionRiesgoParam,
  efectosDeclaracionRiesgoParam,
  controlesDeclaracionRiesgoParam){

    this.declaracionRiesgo = declaracionRiesgoParam;
    this.causasDeclaracionRiesgo = causasDeclaracionRiesgoParam;
    this.efectosDeclaracionRiesgo = efectosDeclaracionRiesgoParam;
    this.controlesDeclaracionRiesgo = controlesDeclaracionRiesgoParam;

  }
}

export class DeclaracionRiesgosCausa {
  name: string;
  number: number;
}
