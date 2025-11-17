import { useState } from "react";
import TabelaDeAlunos from "../components/TabelaDeAlunos";
import useRecuperarAlunosComPaginacao from "../hooks/useRecuperarAlunosComPaginacao.tsx";
import type { Aluno } from "../interfaces/Aluno";
import Paginacao from "../components/Paginacao";
import useRemoverAlunoPorId from "../hooks/useRemoverAlunoPorId.tsx";

const AlunosComPaginacaoPage = () => {
  const [pagina, setPagina] = useState(0);
  const [nome] = useState("");
  const tamanho: number = 4;

  const {
    data: resultadoPaginado,
    isPending: recuperandoAlunosComPaginacao,
    error: errorRecuperarAlunosComPaginacao,
  } = useRecuperarAlunosComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });

  const {
    mutate: removerAluno,
    // isPending: removendoAluno,
    error: errorRemocaoAluno,
  } = useRemoverAlunoPorId();

  const tratarRemocao = (id: number) => {
    removerAluno(id);
    setPagina(0);
  };

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  if (errorRecuperarAlunosComPaginacao) throw errorRecuperarAlunosComPaginacao;
  if (errorRemocaoAluno) throw errorRemocaoAluno;
  if (recuperandoAlunosComPaginacao) return <p>Recuperando alunos...</p>;
  // if (removendoAluno) return <p>Removendo um aluno...</p>;

  const alunos: Aluno[] = resultadoPaginado.itens;
  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  return (
    <>
      <h5>Lista de Alunos</h5>
      <hr className="mt-1" />

      {/* <Pesquisa tratarPesquisa={tratarPesquisa} /> */}
      <TabelaDeAlunos alunos={alunos} tratarRemocao={tratarRemocao} />
      <Paginacao
        pagina={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginacao={tratarPaginacao}
      />
    </>
  );
};
export default AlunosComPaginacaoPage;
