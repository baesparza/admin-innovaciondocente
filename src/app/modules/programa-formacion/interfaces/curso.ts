import { Instructor } from "./instructor";
import { Postulation } from "./postulation";
import { Duration } from "./duration";
import { Content } from "./content";

export interface Curso {
  name: string,
  creator: string,
  created: Date,
  editor?: string,
  edited: Date, F
  description: string,
  img: string,
  date: Date,
  instructors: Instructor[],
  postulation: Postulation,
  duration: Duration,
  schedule: string,
  place: string,
  module: string,
  addressedTo: string,
  content: Content,
}
