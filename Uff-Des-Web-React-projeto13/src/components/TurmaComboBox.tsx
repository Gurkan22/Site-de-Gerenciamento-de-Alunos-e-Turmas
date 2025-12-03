import useInscricaoStore from "../store/InscricaoStore";
import useRecuperarTurmasPorDisciplina from "../hooks/useRecuperarTurmasPorDisciplina";

const TurmaComboBox = () => {
  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const setTurmaId = useInscricaoStore((s) => s.setTurmaId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);
  const setPesquisa = useInscricaoStore((s) => s.setPesquisa);
  const setPagina = useInscricaoStore((s) => s.setPagina);

  const query = useRecuperarTurmasPorDisciplina(disciplinaId);
  const { data: turmas = [], isLoading } = query;

  const tratarMudanca = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    setTurmaId(val);
    // ao mudar turma limpar aluno, pesquisa e pagina
    setAlunoId(undefined);
    setPesquisa("");
    setPagina(0);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Turma</label>
      <select className="form-select" onChange={tratarMudanca} defaultValue="">
        <option value="">-- selecione --</option>
        {isLoading && <option>carregando...</option>}
        {query.isError && (
          <option disabled>
            Erro: {String((query.error as Error)?.message ?? "unknown")}
          </option>
        )}
        {turmas?.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome} - {t.ano}/{t.periodo}
          </option>
        ))}
        {/* debug info */}
        {turmas && turmas.length === 0 && !isLoading && !query.isError && (
          <option disabled>
            Nenhuma turma encontrada para esta disciplina
          </option>
        )}
      </select>
    </div>
  );
};

export default TurmaComboBox;