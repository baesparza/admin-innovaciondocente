import { Guest } from "./guest";
import { DefaultInterface } from "src/app/shared/interface/defaultInterface";
import { Timestamp } from "src/app/shared/interface/timestamp";

export interface Encuentro extends DefaultInterface {
  description: string,
  img: string,
  name: string,
  date: Timestamp,
  postulations: string,
  guests: Guest[]
}


