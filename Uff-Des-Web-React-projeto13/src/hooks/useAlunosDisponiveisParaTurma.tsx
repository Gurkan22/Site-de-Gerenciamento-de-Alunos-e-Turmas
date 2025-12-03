import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";

const fetchTodosAlunos = async (): Promise<Aluno[]> => {
  const resp = await fetch("http://localhost:8080/alunos");
  if (!resp.ok) throw new Error("Erro ao recuperar alunos");
  return resp.json();
};

const fetchAlunosDaTurma = async (
  turmaId?: number | null
): Promise<Aluno[]> => {
  if (!turmaId) return [];
  const resp = await fetch(`http://localhost:8080/turmas/${turmaId}/alunos`);
  if (!resp.ok) throw new Error("Erro ao recuperar alunos da turma");
  return resp.json();
};

const useAlunosDisponiveisParaTurma = (turmaId?: number | null) => {
  return useQuery({
    queryKey: ["alunos", "disponiveis", turmaId],
    queryFn: async () => {
      if (!turmaId) return [] as Aluno[];
      const [todos, inscritos] = await Promise.all([
        fetchTodosAlunos(),
        fetchAlunosDaTurma(turmaId),
      ]);
      const inscritosIds = new Set((inscritos ?? []).map((a) => a.id));
      return todos.filter((a) => !inscritosIds.has(a.id));
    },
    enabled: !!turmaId,
    staleTime: 1000 * 60,
  });
};

export default useAlunosDisponiveisParaTurma;
