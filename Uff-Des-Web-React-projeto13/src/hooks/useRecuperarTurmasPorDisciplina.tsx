import { useQuery } from "@tanstack/react-query";
import type { Turma } from "../interfaces/Turma";

const recuperarTurmas = async (): Promise<Turma[]> => {
  const resp = await fetch("http://localhost:8080/turmas");
  if (!resp.ok) throw new Error("Erro ao recuperar turmas");
  return await resp.json();
};

const useRecuperarTurmasPorDisciplina = (disciplinaId?: number | null) => {
  return useQuery({
    queryKey: ["turmas", "por-disciplina", disciplinaId],
    queryFn: async () => {
      if (!disciplinaId) return [];
      const todas = await recuperarTurmas();
      return todas.filter(
        (t) => t.disciplina && (t.disciplina as any).id === disciplinaId
      );
    },
    enabled: !!disciplinaId,
  });
};

export default useRecuperarTurmasPorDisciplina;
