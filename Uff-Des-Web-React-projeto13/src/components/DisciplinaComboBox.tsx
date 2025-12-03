import useRecuperarDisciplinas from "../hooks/useRecuperarDisciplinas";
import useInscricaoStore from "../store/InscricaoStore";

const DisciplinaComboBox = () => {
  const { data: disciplinas, isLoading } = useRecuperarDisciplinas();
  const setDisciplinaId = useInscricaoStore((s) => s.setDisciplinaId);
  const setTurmaId = useInscricaoStore((s) => s.setTurmaId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);
  const setPesquisa = useInscricaoStore((s) => s.setPesquisa);
  const setPagina = useInscricaoStore((s) => s.setPagina);

  const tratarMudanca = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    setDisciplinaId(val);
    // ao mudar disciplina limpar turma, aluno, pesquisa e pagina
    setTurmaId(undefined);
    setAlunoId(undefined);
    setPesquisa("");
    setPagina(0);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Disciplina</label>
      <select className="form-select" onChange={tratarMudanca} defaultValue="">
        <option value="">-- selecione --</option>
        {isLoading && <option>carregando...</option>}
        {disciplinas?.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DisciplinaComboBox;
