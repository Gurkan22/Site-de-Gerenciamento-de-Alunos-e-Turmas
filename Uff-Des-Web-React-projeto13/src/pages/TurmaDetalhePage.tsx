import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Aluno } from "../interfaces/Aluno";
import type { Turma } from "../interfaces/Turma";

const TurmaDetalhePage = () => {
  const { id } = useParams();
  const [turma, setTurma] = useState<Turma | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const turmaResp = await fetch(`http://localhost:8080/turmas/${id}`);
        if (!turmaResp.ok) throw new Error("Erro ao buscar turma");
        const turmaData = await turmaResp.json();
        setTurma(turmaData);

        const alunosResp = await fetch(
          `http://localhost:8080/turmas/${id}/alunos`
        );
        if (!alunosResp.ok) throw new Error("Erro ao buscar alunos da turma");
        const alunosData = await alunosResp.json();
        setAlunos(alunosData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTurma();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!turma) return <p>Turma não encontrada.</p>;

  return (
    <div>
      <h5>Detalhes da Turma</h5>
      <p>
        <b>Turma:</b> {turma.nome}
      </p>
      <p>
        <b>Disciplina:</b> {turma.disciplina?.nome}
      </p>
      <p>
        <b>Professor:</b> {turma.professor?.nome}
      </p>
      <p>
        <b>Ano:</b> {turma.ano}
      </p>
      <p>
        <b>Período:</b> {turma.periodo}
      </p>
      <hr />
      <h6>Alunos da Turma</h6>
      <table className="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TurmaDetalhePage;
