import type { Professor } from "./Professor";
import type { Disciplina } from "./Disciplina";

export interface Turma {
  id: number;
  nome: string;
  ano: number;
  periodo: string;
  disciplina: Disciplina;
  professor: Professor;
}
