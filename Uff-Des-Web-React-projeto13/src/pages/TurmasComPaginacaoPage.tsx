import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabelaDeTurmas from "../components/TabelaDeTurmas";
import useRecuperarTurmasComPaginacao from "../hooks/useRecuperarTurmasComPaginacao";
import type { Turma } from "../interfaces/Turma";
import Paginacao from "../components/Paginacao";
import useRemoverTurmaPorId from "../hooks/useRemoverTurmaPorId";

const TurmasComPaginacaoPage = () => {
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(0);
  const nome = "";
  const tamanho = 4;

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

  const turmas: Turma[] = resultadoPaginado.itens;
  const totalDePaginas = resultadoPaginado.totalDePaginas;

  return (
    <>
      <h5>Lista de Turmas</h5>
      <hr className="mt-1" />
      <TabelaDeTurmas
        turmas={turmas}
        turmaSelecionada={null}
        onSelecionar={(turma) => navigate(`/turmas/${turma.id}`)}
        tratarRemocao={tratarRemocao}
      />
      <Paginacao
        pagina={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginacao={tratarPaginacao}
      />
    </>
  );
};
export default TurmasComPaginacaoPage;
