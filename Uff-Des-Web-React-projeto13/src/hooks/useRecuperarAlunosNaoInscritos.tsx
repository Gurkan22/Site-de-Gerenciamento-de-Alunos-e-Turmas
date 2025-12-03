import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";

// Recupera todos os alunos e filtra os que não estão na turma (a filtragem é feita no client)
const recuperarAlunos = async (): Promise<Aluno[]> => {
  const resp = await fetch("http://localhost:8080/alunos");
  if (!resp.ok) throw new Error("Erro ao recuperar alunos");
  return await resp.json();
};

const useRecuperarAlunosNaoInscritos = (
  turmaId?: number | null,
  inscritos?: Aluno[]
) => {
  return useQuery({
    queryKey: ["alunos", "nao-inscritos", turmaId],
    queryFn: async () => {
      const todos = await recuperarAlunos();
      if (!turmaId) return [];
      const inscritosIds = new Set((inscritos ?? []).map((a) => a.id));
      return todos.filter((a) => !inscritosIds.has(a.id));
    },
    // só habilita quando turmaId existir E quando a lista de inscritos já tiver sido carregada
    enabled: !!turmaId && typeof inscritos !== "undefined",
  });
};

export default useRecuperarAlunosNaoInscritos;
