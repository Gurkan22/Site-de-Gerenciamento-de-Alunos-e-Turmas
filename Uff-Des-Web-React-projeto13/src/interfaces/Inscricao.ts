import type { Aluno } from "./Aluno";
import type { Turma } from "./Turma";

export interface Inscricao {
  id: number;
  aluno: Aluno;
  turma: Turma;
  dataInscricao: Date;
}
