import useInscricaoStore from "../store/InscricaoStore";
import useRecuperarAlunosDaTurmaComPaginacao from "../hooks/useRecuperarAlunosDaTurmaComPaginacao";
import useRecuperarTurmaPorId from "../hooks/useRecuperarTurmaPorId";
import Paginacao from "./Paginacao";
import useRemoverAlunoDaTurma from "../hooks/useRemoverAlunoDaTurma";
import { useEffect, useMemo } from "react";

const TabelaDeAlunosPorTurma = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const pesquisa = useInscricaoStore((s) => s.pesquisa);
  const pagina = useInscricaoStore((s) => s.pagina);
  const setPagina = useInscricaoStore((s) => s.setPagina);
  const setInscritos = useInscricaoStore((s) => s.setInscritos);

  const pageSize = 4;
  const {
    data: resultado = {
      itens: [],
      totalDePaginas: 1,
      totalDeItens: 0,
      paginaCorrente: 0,
    },
    isLoading,
    isError,
    error,
  } = useRecuperarAlunosDaTurmaComPaginacao({
    pagina: pagina.toString(),
    tamanho: pageSize.toString(),
    turmaId: turmaId ?? 0,
  });
  const alunos = resultado.itens ?? [];

  const turmaQuery = useRecuperarTurmaPorId(turmaId);
  const turma = turmaQuery.data;

  // manter inscritos no store para que o AlunoComboBox possa filtrar
  useEffect(() => {
    setInscritos(alunos);
  }, [alunos, setInscritos]);

  // filtrar em memória pelo nome (aplica apenas aos itens da página atual)
  const filtrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    let arr = alunos;
    if (termo) arr = arr.filter((a) => a.nome.toLowerCase().includes(termo));
    return arr;
  }, [alunos, pesquisa]);

  const totalDePaginas = resultado.totalDePaginas || 1;

  useEffect(() => {
    if (pagina >= totalDePaginas) setPagina(0);
  }, [totalDePaginas, pagina, setPagina]);

  const removerAlunoDaTurma = useRemoverAlunoDaTurma();

  if (!turmaId)
    return (
      <div className="card p-3">
        Selecione uma disciplina e turma para ver alunos inscritos.
      </div>
    );

  if (isError)
    return (
      <div className="card p-3 text-danger">
        Erro ao recuperar alunos da turma:{" "}
        {String((error as Error)?.message ?? "unknown")}
      </div>
    );

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Alunos inscritos</h5>
        <div className="small text-muted">
          Total de alunos da turma: {alunos.length}
        </div>
      </div>
      {turma && (
        <div className="mb-3 p-2 border rounded">
          <div className="d-flex gap-3 flex-wrap">
            <div>
              <strong>Ano:</strong> {turma.ano}
            </div>
            <div>
              <strong>Período:</strong> {turma.periodo}
            </div>
            <div>
              <strong>Disciplina:</strong> {turma.disciplina?.nome ?? "-"}
            </div>
            <div>
              <strong>Prof.:</strong> {turma.professor?.nome ?? "-"}
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover table-sm">
              <thead>
                <tr>
                  <th className="text-center align-middle">ID</th>
                  <th className="text-center align-middle">Matrícula</th>
                  <th className="text-center align-middle">Nome</th>
                  <th className="text-center align-middle">Email</th>
                  <th className="text-center align-middle">Ação</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((a) => (
                  <tr key={a.inscricaoId ?? a.id}>
                    <td className="text-center align-middle">
                      {a.inscricaoId ?? "-"}
                    </td>
                    <td className="text-center align-middle">{a.id}</td>
                    <td className="align-middle ps-3">{a.nome}</td>
                    <td className="align-middle">{a.email}</td>
                    <td className="text-center align-middle">
                      <button
                        onClick={() =>
                          removerAlunoDaTurma.mutate({
                            turmaId: turmaId,
                            alunoId: a.id,
                          })
                        }
                        type="button"
                        className="btn btn-sm"
                        style={{ backgroundColor: "#ec0000ff", color: "#fff" }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginacao
            pagina={pagina}
            totalDePaginas={totalDePaginas}
            tratarPaginacao={setPagina}
          />
        </>
      )}
    </div>
  );
};

export default TabelaDeAlunosPorTurma;
