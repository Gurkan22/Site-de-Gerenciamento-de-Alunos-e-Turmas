import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarTurmasPorDisciplina = (disciplinaId?: number | null) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["turmas", "por-disciplina", disciplinaId, token],
    queryFn: () => api.recuperarTurmasPorDisciplina(disciplinaId),
    enabled: !!disciplinaId && !!token,
  });
};

export default useRecuperarTurmasPorDisciplina;
