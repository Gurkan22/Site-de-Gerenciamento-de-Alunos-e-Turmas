import useInscricaoStore from "../store/InscricaoStore";
import useAlunosDisponiveisParaTurma from "../hooks/useAlunosDisponiveisParaTurma";

const AlunoComboBox = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);

  // Busca em paralelo todos os alunos e os alunos já inscritos da turma, devolvendo somente os disponíveis.
  const query = useAlunosDisponiveisParaTurma(turmaId);
  const { data: alunos, isLoading } = query;

  const tratarMudanca = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    setAlunoId(val);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Aluno</label>
      <select
        className="form-select"
        onChange={tratarMudanca}
        defaultValue=""
        disabled={!turmaId}
      >
        <option value="">-- selecione --</option>
        {!turmaId && <option disabled>Selecione uma turma primeiro</option>}
        {isLoading && <option>carregando...</option>}
        {query.isError && (
          <option disabled>
            Erro: {String((query.error as Error)?.message ?? "unknown")}
          </option>
        )}
        {alunos?.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome} ({a.email})
          </option>
        ))}
        {alunos && alunos.length === 0 && !isLoading && !query.isError && (
          <option disabled>Nenhum aluno disponível para inscrição</option>
        )}
      </select>
    </div>
  );
};

export default AlunoComboBox;
