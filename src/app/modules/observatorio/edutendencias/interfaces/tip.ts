import { DefaultInterface } from "src/app/shared/interface/defaultInterface";

export interface Tip extends DefaultInterface {
  name: string,
  img: string,
  description: string,
  link: string,
  tag: string,
}

