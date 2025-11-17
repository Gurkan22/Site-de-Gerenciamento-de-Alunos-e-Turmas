import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";

const recuperarAlunosDaTurma = async (turmaId?: number): Promise<Aluno[]> => {
  if (!turmaId) return [];
  const response = await fetch(`http://localhost:8080/turmas/${turmaId}/alunos`);
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar alunos da turma. Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarAlunosDaTurma = (turmaId?: number | null) => {
  return useQuery({
    queryKey: ["turmas", turmaId, "alunos"],
    queryFn: () => recuperarAlunosDaTurma(turmaId ?? undefined),
    enabled: !!turmaId,
    placeholderData: keepPreviousData,
  });
};

export default useRecuperarAlunosDaTurma;
