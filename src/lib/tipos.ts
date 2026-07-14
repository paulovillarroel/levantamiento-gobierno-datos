// Tipos del dominio de la autoevaluación.

/** Valor de una respuesta: nivel de madurez 1..5, o "na" (No sé / No aplica). */
export type Valor = 1 | 2 | 3 | 4 | 5 | 'na';

export interface Pregunta {
  id: string;
  texto: string;
}

/**
 * Escalera de acciones concretas por nivel de madurez.
 * La clave es el nivel que se busca ALCANZAR: n2 = pasar de Inicial (1) a Básico (2),
 * n3 = de Básico a Definido, n4 = de Definido a Gestionado, n5 = de Gestionado a Optimizado.
 */
export interface AccionesNivel {
  n2: string;
  n3: string;
  n4: string;
  n5: string;
}

export interface Dimension {
  id: string;
  nombre: string;
  /** Ponderación de la dimensión en el puntaje del módulo (1 normal, 1.5 crítica). */
  peso: number;
  critica: boolean;
  /** Acciones para subir al siguiente nivel; el reporte muestra la que corresponde al nivel actual. */
  acciones: AccionesNivel;
  preguntas: Pregunta[];
}

export interface Modulo {
  id: string;
  titulo: string;
  /** Título corto para KPIs y radares (opcional; si falta se usa `titulo`). */
  tituloCorto?: string;
  descripcion: string;
  dimensiones: Dimension[];
}

export interface Banco {
  modulos: Modulo[];
}

export interface NivelEscala {
  v: number;
  nombre: string;
  frase: string;
  desc: string;
  /** Variable CSS con el color del nivel. */
  color: string;
  mgde: string;
}

/** Resumen de nivel para un promedio dado (puede no tener datos). */
export interface NivelInfo {
  v: number | null;
  nombre: string;
  color: string;
  mgde: string;
}

/** Respuestas indexadas por id de pregunta. */
export type Respuestas = Record<string, Valor>;

export interface Meta {
  institucion?: string;
  area?: string;
  rol?: string;
  evaluador?: string;
  /** Quiénes participaron en la reunión de levantamiento. */
  participantes?: string;
  /** La institución pertenece al sector salud: activa el Módulo C (preguntas sectoriales). */
  sectorSalud?: boolean;
}

/** Una sesión de levantamiento: las respuestas de una reunión con un área/departamento. */
export interface Sesion {
  id: string;
  meta: Meta;
  respuestas: Respuestas;
  /** Fechas ISO de creación y última modificación. */
  creada: string;
  actualizada: string;
}

/** Estructura del archivo JSON exportado/importado. */
export interface ArchivoExport {
  herramienta: string;
  version: number;
  fecha: string;
  meta: Meta;
  respuestas: Respuestas;
}
