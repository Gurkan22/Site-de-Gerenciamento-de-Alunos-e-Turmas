import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarTurmasFiltradas = (nome: string) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["turmas", "search", nome, token],
    queryFn: () => api.recuperarTurmasFiltradas(nome),
    enabled: nome.length > 0 && !!token,
  });
};

export default useRecuperarTurmasFiltradas;
