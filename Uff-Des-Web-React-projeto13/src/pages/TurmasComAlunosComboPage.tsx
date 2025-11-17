import { useEffect, useState } from "react";
import useRecuperarAlunosDaTurma from "../hooks/useRecuperarAlunosDaTurma";
import useRecuperarTodasTurmas from "../hooks/useRecuperarTodasTurmas";
import type { Turma } from "../interfaces/Turma";

const TurmasComAlunosComboPage = () => {
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [grupoAtual, setGrupoAtual] = useState<number[]>([]); // ids de alunos no grupo da turma selecionada

  // Recupera todas as turmas para popular o combo box
  const {
    data: todasTurmas,
    isLoading: carregandoTurmas,
    error: erroTurmas,
  } = useRecuperarTodasTurmas();

  // Busca alunos da turma selecionada (usa endpoint /turmas/{id}/alunos)
  const {
    data: alunosDaTurma,
    error: erroAlunos,
  } = useRecuperarAlunosDaTurma(turmaSelecionada?.id ?? undefined);

  // Handler seleção de turma
  const handleSelecionarTurma = (turma: Turma | null) => {
    setTurmaSelecionada(turma);
  };

  // localStorage: chave por turma deve ser o código/nome da turma (ex: A1)
  const carregarGrupoDoLocalStorage = (turmaNome?: string | null) => {
    if (!turmaNome) return [] as number[];
    try {
      const raw = localStorage.getItem(turmaNome);
      if (!raw) return [] as number[];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as number[];
      return [] as number[];
    } catch (e) {
      return [] as number[];
    }
  };

  useEffect(() => {
    // Sempre que a turma selecionada mudar, atualiza o grupoAtual a partir do localStorage
    setGrupoAtual(carregarGrupoDoLocalStorage(turmaSelecionada?.nome ?? null));
  }, [turmaSelecionada]);

  const salvarGrupoNoLocalStorage = (turmaNome: string, grupo: number[]) => {
    localStorage.setItem(turmaNome, JSON.stringify(grupo));
  };

  const incluirAlunoNoGrupo = (alunoId: number) => {
    if (!turmaSelecionada) return;
    const key = turmaSelecionada.nome;
    const atual = carregarGrupoDoLocalStorage(key);
    if (!atual.includes(alunoId)) {
      const novo = [...atual, alunoId];
      salvarGrupoNoLocalStorage(key, novo);
      setGrupoAtual(novo);
    }
  };

  const removerAlunoDoGrupo = (alunoId: number) => {
    if (!turmaSelecionada) return;
    const key = turmaSelecionada.nome;
    const atual = carregarGrupoDoLocalStorage(key);
    const novo = atual.filter((id) => id !== alunoId);
    salvarGrupoNoLocalStorage(key, novo);
    setGrupoAtual(novo);
  };

  return (
    <div style={{ padding: 24 }}>
      <h5>Lista de alunos por turma</h5>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <label htmlFor="select-turma" style={{ marginRight: 8 }}>
          Turma:
        </label>
        <select
          id="select-turma"
          value={turmaSelecionada?.id ?? ""}
          onChange={(e) => {
            const id = Number(e.target.value || 0);
            const turma = (todasTurmas ?? []).find((t) => t.id === id) ?? null;
            handleSelecionarTurma(turma);
          }}
          style={{ padding: 6, minWidth: 220 }}
        >
          <option value="">Selecione uma turma</option>
          {todasTurmas && todasTurmas.map((t) => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-sm">
          <thead>
            <tr>
              <th className="text-center align-middle">Id</th>
              <th className="text-center align-middle">Nome</th>
              <th className="text-center align-middle">Email</th>
              <th className="text-center align-middle">Ação</th>
            </tr>
          </thead>
          <tbody>
            {/* Se nenhuma turma selecionada, não mostrar linhas (apenas cabeçalho) */}
            {turmaSelecionada && alunosDaTurma && alunosDaTurma.length > 0 ? (
              alunosDaTurma.map((aluno) => {
                const incluido = grupoAtual.includes(aluno.id);
                return (
                  <tr key={aluno.id}>
                    <td className="text-center align-middle">{aluno.id}</td>
                    <td className="align-middle ps-3">{aluno.nome}</td>
                    <td className="align-middle">{aluno.email}</td>
                    <td className="text-center align-middle">
                      {incluido ? (
                        <button
                          onClick={() => removerAlunoDoGrupo(aluno.id)}
                          type="button"
                          className="btn btn-sm btn-danger"
                        >
                          Remover
                        </button>
                      ) : (
                        <button
                          onClick={() => incluirAlunoNoGrupo(aluno.id)}
                          type="button"
                          className="btn btn-sm btn-primary"
                        >
                          Incluir
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              // nenhuma turma selecionada ou sem alunos: não renderiza linhas
              null
            )}
          </tbody>
        </table>
      </div>

      {carregandoTurmas && <p>Carregando turmas...</p>}
      {erroTurmas && <p>Erro ao carregar turmas.</p>}
      {erroAlunos && <p>Erro ao carregar alunos.</p>}
    </div>
  );
};

export default TurmasComAlunosComboPage;
