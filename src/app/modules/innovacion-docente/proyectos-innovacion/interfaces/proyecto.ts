import { DefaultInterface } from "src/app/shared/interface/defaultInterface";

export interface Proyecto extends DefaultInterface {
  name: string; // titulo de la propuesta
  coordinator: string; // nombre cordinador
  modality: string; // modalidad
  participants: Participant[]; // participantes
  strategicLine: string; // linea estrategica
  type: String; // tipo de propuesta
  periods: string[]; // periodo
  subject: string; // asignatura

  // other data
  img: string;
  infografic: string;
  videoID: string;
  documents: string[];
  area: Area;
}

export interface Area {
  tecnica: boolean,
  administrativa: boolean,
  biologica: boolean,
  sociohumanistica: boolean,
}

export interface Participant {
  name: string, // nombre
  department: string, // carrera
  subject: string, // carrera
  mail: string, // carrera
}