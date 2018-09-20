import { Instructor } from "./instructor";
import { Postulation } from "./postulation";
import { Duration } from "./duration";
import { DownloadableContent } from "./downloadableContent";

export interface Curso {
  id?: any
  name: string,
  creator: string,
  created: Date,
  editor?: string,
  edited: Date,
  description: string,
  typeId: number,
  date: string,
  instructors: Instructor[],
  postulation: Postulation,
  duration: Duration,
  schedule: string,
  place: string,
  module: string,
  addressedTo: string,
  downloadableContent: DownloadableContent[],
}
