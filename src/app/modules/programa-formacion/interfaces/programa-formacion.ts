import { Curso } from "./curso";
import { BannerCursos } from "./banner-cursos";

export interface ProgramaFormacion {
  cursos: Curso[],
  bannerCursos: BannerCursos[]
}
