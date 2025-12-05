import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}

const useRecuperarAlunosComPaginacao = (queryString: QueryString) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["alunos", "paginacao", queryString, token],
    queryFn: () =>
      api.recuperarAlunosComPaginacao(
        parseInt(queryString.pagina),
        parseInt(queryString.tamanho)
      ),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};

export default useRecuperarAlunosComPaginacao;
