import { Instructor } from "./instructor";
import { Postulation } from "./postulation";
import { Duration } from "./duration";
import { DownloadableContent } from "./downloadableContent";
import { DefaultInterface } from "src/app/shared/interface/defaultInterface";

export interface Curso extends DefaultInterface {
  id?: any
  name: string,
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
  downloadableContent: DownloadableContent[],
}
