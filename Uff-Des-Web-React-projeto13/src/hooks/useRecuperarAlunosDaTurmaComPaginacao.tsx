import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

interface QueryString {
  pagina: string;
  tamanho: string;
  turmaId: number;
}

const useRecuperarAlunosDaTurmaComPaginacao = (queryString: QueryString) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: [
      "turmas",
      queryString.turmaId,
      "alunos",
      "paginacao",
      queryString,
      token,
    ],
    queryFn: () =>
      api.recuperarAlunosDaTurmaComPaginacao(
        queryString.turmaId,
        parseInt(queryString.pagina),
        parseInt(queryString.tamanho)
      ),
    placeholderData: keepPreviousData,
    enabled: !!queryString.turmaId && !!token,
  });
};

export default useRecuperarAlunosDaTurmaComPaginacao;
