import { Guest } from "./guest";
import { DefaultInterface } from "src/app/shared/interface/defaultInterface";

export interface Encuentro extends DefaultInterface {
  description: string,
  img: string,
  name: string,
  date: string,
  postulations: string,
  guests: Guest[]
}


