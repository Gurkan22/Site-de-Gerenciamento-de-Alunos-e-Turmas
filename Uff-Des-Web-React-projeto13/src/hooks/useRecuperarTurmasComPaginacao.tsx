import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}

const useRecuperarTurmasComPaginacao = (queryString: QueryString) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["turmas", "paginacao", queryString, token],
    queryFn: () =>
      api.recuperarTurmasComPaginacao(
        queryString.pagina,
        queryString.tamanho,
        queryString.nome
      ),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};

export default useRecuperarTurmasComPaginacao;
