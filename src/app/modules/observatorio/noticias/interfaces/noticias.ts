import { DefaultInterface } from "src/app/shared/interface/defaultInterface";

export interface Noticia extends DefaultInterface {
  name: string,
  description: string,
  html: string,
  img: string,
}
