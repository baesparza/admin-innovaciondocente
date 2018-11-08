import { DefaultInterface } from "src/app/shared/interface/defaultInterface";

export interface Proyecto extends DefaultInterface {
  name: String,
  img: String,
  certification: String,
  type: String,
  teachers: String[],
  documents: String[],
  area: Area,
}

export interface Area {
  tecnica: boolean,
  administrativa: boolean,
  biologica: boolean,
  sociohumanistica: boolean,
}
