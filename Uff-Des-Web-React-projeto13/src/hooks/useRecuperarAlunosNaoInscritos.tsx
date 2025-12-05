import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarAlunosNaoInscritos = (
  turmaId?: number | null,
  inscritos?: Aluno[]
) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["alunos", "nao-inscritos", turmaId, token],
    queryFn: async () => {
      const todos = await api.recuperarAlunos();
      if (!turmaId) return [];
      const inscritosIds = new Set((inscritos ?? []).map((a) => a.id));
      return todos.filter((a) => !inscritosIds.has(a.id));
    },
    enabled: !!turmaId && typeof inscritos !== "undefined" && !!token,
  });
};

export default useRecuperarAlunosNaoInscritos;
