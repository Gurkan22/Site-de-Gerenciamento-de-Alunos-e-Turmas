import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useAlunosDisponiveisParaTurma = (turmaId?: number | null) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["alunos", "disponiveis", turmaId, token],
    queryFn: () => api.recuperarAlunosDisponiveisParaTurma(turmaId),
    enabled: !!turmaId && !!token,
  });
};

export default useAlunosDisponiveisParaTurma;
