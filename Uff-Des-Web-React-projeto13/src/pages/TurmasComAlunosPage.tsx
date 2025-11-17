import { useState } from "react";
import TabelaDeTurmas from "../components/TabelaDeTurmas";
import TabelaDeAlunos from "../components/TabelaDeAlunos";
import useRecuperarTurmasFiltradas from "../hooks/useRecuperarTurmasFiltradas";
//import useRecuperarAlunosDaTurma from "../hooks/useRecuperarAlunosDaTurma";
import useRecuperarAlunosDaTurmaComPaginacao from "../hooks/useRecuperarAlunosDaTurmaComPaginacao";
import Paginacao from "../components/Paginacao";
import type { Turma } from "../interfaces/Turma";

const TurmasComAlunosPage = () => {
  const [paginaAlunos, setPaginaAlunos] = useState(0);
  const tamanhoAlunos = 4;
  const [pesquisa, setPesquisa] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);

  // Busca turmas filtradas
  const {
    data: turmasFiltradas,
    //isPending: carregandoTurmas,
    error: erroTurmas,
  } = useRecuperarTurmasFiltradas(pesquisa);

  // Busca alunos da turma selecionada com paginação
  const { data: resultadoAlunos, error: erroAlunos } =
    useRecuperarAlunosDaTurmaComPaginacao({
      pagina: paginaAlunos.toString(),
      tamanho: tamanhoAlunos.toString(),
      turmaId: turmaSelecionada?.id ?? 0,
    });

  // Handler seleção de turma
  const handleSelecionarTurma = (turma: Turma) => {
    setTurmaSelecionada(turma);
    setPaginaAlunos(0);
  };

  // Handler remoção (não faz nada, só para interface)
  const tratarRemocaoTurma = () => {};
  const tratarRemocaoAluno = () => {};

  return (
    <div style={{ padding: 24 }}>
      <h2>Pesquisa:</h2>
      <input
        type="text"
        value={pesquisa}
        onChange={(e) => {
          setPesquisa(e.target.value);
          setTurmaSelecionada(null);
        }}
        placeholder="Digite para pesquisar turmas..."
        style={{ width: 300, fontSize: 18 }}
      />
      <div style={{ display: "flex", marginTop: 24 }}>
        <div style={{ minWidth: 220, marginRight: 24 }}>
          {pesquisa.length > 0 &&
            turmasFiltradas &&
            turmasFiltradas.length > 0 && (
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>Turmas:</div>
            )}
          {/* Lista de turmas */}
          {pesquisa && turmasFiltradas && turmasFiltradas.length > 0 && (
            <TabelaDeTurmas
              turmas={turmasFiltradas}
              turmaSelecionada={turmaSelecionada}
              onSelecionar={handleSelecionarTurma}
              tratarRemocao={tratarRemocaoTurma}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {/* Detalhes e alunos da turma selecionada */}
          {turmaSelecionada && (
            <>
              <div style={{ marginBottom: 8 }}>
                <strong>Ano:</strong> {turmaSelecionada.ano} &nbsp;
                <strong>Período:</strong> {turmaSelecionada.periodo} &nbsp;
                <strong>Disc:</strong> {turmaSelecionada.disciplina?.nome}{" "}
                &nbsp;
                <strong>Prof:</strong> {turmaSelecionada.professor?.nome}
              </div>
              {resultadoAlunos && resultadoAlunos.itens.length > 0 && (
                <>
                  <TabelaDeAlunos
                    alunos={resultadoAlunos.itens}
                    tratarRemocao={tratarRemocaoAluno}
                  />
                  <Paginacao
                    pagina={paginaAlunos}
                    totalDePaginas={resultadoAlunos.totalDePaginas}
                    tratarPaginacao={setPaginaAlunos}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* Paginação das turmas removida para busca filtrada */}
      {/* Mensagens de carregamento/erro */}
      {/* {carregandoTurmas && <p>Carregando turmas...</p>} */}
      {erroTurmas && <p>Erro ao carregar turmas.</p>}
      {/* {carregandoAlunos && <p>Carregando alunos...</p>} */}
      {erroAlunos && <p>Erro ao carregar alunos.</p>}
    </div>
  );
};

export default TurmasComAlunosPage;
