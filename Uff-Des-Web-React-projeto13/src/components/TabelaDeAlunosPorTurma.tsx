import useInscricaoStore from "../store/InscricaoStore";
import useRecuperarAlunosDaTurma from "../hooks/useRecuperarAlunosDaTurma";
import useRecuperarTurmaPorId from "../hooks/useRecuperarTurmaPorId";
import Paginacao from "./Paginacao";
import { useEffect, useMemo } from "react";

const TabelaDeAlunosPorTurma = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const pesquisa = useInscricaoStore((s) => s.pesquisa);
  const pagina = useInscricaoStore((s) => s.pagina);
  const setPagina = useInscricaoStore((s) => s.setPagina);
  const setInscritos = useInscricaoStore((s) => s.setInscritos);

  const query = useRecuperarAlunosDaTurma(turmaId);
  const { data: alunos = [], isLoading } = query;

  const turmaQuery = useRecuperarTurmaPorId(turmaId);
  const turma = turmaQuery.data;

  // manter inscritos no store para que o AlunoComboBox possa filtrar
  useEffect(() => {
    setInscritos(alunos);
  }, [alunos, setInscritos]);

  // filtrar em memória pelo nome
  const filtrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    let arr = alunos;
    if (termo) arr = arr.filter((a) => a.nome.toLowerCase().includes(termo));
    // ordenar desc por id (simula ordenação por id da inscrição)
    arr = arr.slice().sort((a, b) => b.id - a.id);
    return arr;
  }, [alunos, pesquisa]);

  const pageSize = 5;
  const totalDePaginas = Math.ceil(filtrados.length / pageSize) || 1;

  const paginado = filtrados.slice(pagina * pageSize, (pagina + 1) * pageSize);

  useEffect(() => {
    if (pagina >= totalDePaginas) setPagina(0);
  }, [totalDePaginas, pagina, setPagina]);

  if (!turmaId)
    return (
      <div className="card p-3">
        Selecione uma disciplina e turma para ver alunos inscritos.
      </div>
    );

  if (query.isError)
    return (
      <div className="card p-3 text-danger">
        Erro ao recuperar alunos da turma:{" "}
        {String((query.error as Error)?.message ?? "unknown")}
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
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {paginado.map((a) => (
                  <tr key={a.id}>
                    <td className="text-center align-middle">{a.id}</td>
                    <td className="align-middle ps-3">{a.nome}</td>
                    <td className="align-middle">{a.email}</td>
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
