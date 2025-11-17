import { useState } from "react";
import TabelaDeTurmas from "../components/TabelaDeTurmas.tsx";
import useRecuperarTurmasComPaginacao from "../hooks/useRecuperarTurmasComPaginacao.tsx";
import type { Turma } from "../interfaces/Turma";
import Paginacao from "../components/Paginacao";
import useRemoverTurmaPorId from "../hooks/useRemoverTurmaPorId.tsx";

const TurmasComPaginacaoPage = () => {
  const [pagina, setPagina] = useState(0);
  const [nome, setNome] = useState("");
  const tamanho: number = 5;

  const {
    data: resultadoPaginado,
    isPending: recuperandoTurmasComPaginacao,
    error: errorRecuperarTurmasComPaginacao,
  } = useRecuperarTurmasComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });

  const {
    mutate: removerTurma,
    // isPending: removendoTurma,
    error: errorRemocaoTurma,
  } = useRemoverTurmaPorId();

  const tratarRemocao = (id: number) => {
    removerTurma(id);
    setPagina(0);
  };

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  if (errorRecuperarTurmasComPaginacao) throw errorRecuperarTurmasComPaginacao;
  if (errorRemocaoTurma) throw errorRemocaoTurma;
  if (recuperandoTurmasComPaginacao) return <p>Recuperando turmas...</p>;
  // if (removendoTurma) return <p>Removendo uma turma...</p>;

  const turmas: Turma[] = resultadoPaginado.itens;
  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  return (
    <>
      <h5>Lista de Turmas</h5>
      <hr className="mt-1" />

      {/* <Pesquisa tratarPesquisa={tratarPesquisa} /> */}
      <TabelaDeTurmas turmas={turmas} tratarRemocao={tratarRemocao} />
      <Paginacao
        pagina={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginacao={tratarPaginacao}
      />
    </>
  );
};
export default TurmasComPaginacaoPage;
