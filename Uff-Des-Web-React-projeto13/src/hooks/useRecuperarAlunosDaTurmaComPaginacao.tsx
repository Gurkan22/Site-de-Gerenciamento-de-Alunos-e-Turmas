import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";

interface QueryString {
  pagina: string;
  tamanho: string;
  turmaId: number;
}

const recuperarAlunosDaTurmaComPaginacao = async (
  queryString: QueryString
): Promise<ResultadoPaginado<Aluno>> => {
  const { pagina, tamanho, turmaId } = queryString;
  if (!turmaId)
    return { itens: [], totalDePaginas: 0, totalDeItens: 0, paginaCorrente: 0 };
  const response = await fetch(
    `http://localhost:8080/turmas/${turmaId}/alunos/paginacao?` +
      new URLSearchParams({ pagina, tamanho })
  );
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar alunos da turma com paginação. Status code: " +
        response.status
    );
  }
  return await response.json();
};

const useRecuperarAlunosDaTurmaComPaginacao = (queryString: QueryString) => {
  return useQuery({
    queryKey: [
      "turmas",
      queryString.turmaId,
      "alunos",
      "paginacao",
      queryString,
    ],
    queryFn: () => recuperarAlunosDaTurmaComPaginacao(queryString),
    enabled: !!queryString.turmaId,
    placeholderData: keepPreviousData,
  });
};

export default useRecuperarAlunosDaTurmaComPaginacao;
