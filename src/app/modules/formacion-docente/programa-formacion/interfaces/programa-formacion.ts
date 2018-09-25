import { Curso } from "./curso";
import { BannerCurso } from "./banner-cursos";

export interface ProgramaFormacion {
  cursos: Curso[],
  bannerCursos: BannerCurso[]
}
