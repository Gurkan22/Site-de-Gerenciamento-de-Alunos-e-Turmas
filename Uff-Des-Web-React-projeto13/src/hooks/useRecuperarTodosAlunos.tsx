import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarTodosAlunos = () => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["alunos", token],
    queryFn: () => api.recuperarAlunos(),
    enabled: !!token,
  });
};

export default useRecuperarTodosAlunos;
