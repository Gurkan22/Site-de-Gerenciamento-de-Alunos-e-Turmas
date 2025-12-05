import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarAlunosDaTurma = (turmaId?: number) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["turmas", turmaId, "alunos", token],
    queryFn: () => api.recuperarAlunosDaTurma(turmaId!),
    enabled: !!turmaId && !!token,
  });
};

export default useRecuperarAlunosDaTurma;
