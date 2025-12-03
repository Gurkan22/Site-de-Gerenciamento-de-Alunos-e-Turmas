import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AlunoForm from "../components/AlunoForm";
import type { Turma } from "../interfaces/Turma";

const recuperarAluno = async (id?: string | null) => {
  if (!id) throw new Error("id inválido");
  const resp = await fetch(`http://localhost:8080/alunos/${id}`);
  if (!resp.ok) throw new Error("Erro ao recuperar aluno");
  return await resp.json();
};

const AlunoPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);

  const { data: aluno, isLoading } = useQuery({
    queryKey: ["alunos", id],
    queryFn: () => recuperarAluno(id ?? undefined),
    enabled: !!id,
  });

  const turmasQuery = useQuery({
    queryKey: ["alunos", id, "turmas"],
    queryFn: async () => {
      if (!id) return [];
      const resp = await fetch(`http://localhost:8080/alunos/${id}/turmas`);
      if (!resp.ok) throw new Error(await resp.text());
      return resp.json();
    },
    enabled: !!id,
  });
  const turmas = turmasQuery.data ?? [];

  if (isLoading) return <div className="container mt-3">Carregando...</div>;
  if (!aluno) return <div className="container mt-3">Aluno não encontrado</div>;

  const handleSaved = (novoAluno: {
    id: number;
    nome: string;
    email: string;
  }) => {
    // atualizar cache local e sair do modo edição
    queryClient.setQueryData(["alunos", String(novoAluno.id)], novoAluno);
    setEditMode(false);
  };

  return (
    <div className="container mt-3">
      {!editMode ? (
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{aluno.nome}</h4>
            <div>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
            </div>
          </div>
          <p className="mt-2">
            <strong>Email:</strong> {aluno.email}
          </p>
          <p>
            <strong>ID:</strong> {aluno.id}
          </p>
        </div>
      ) : (
        <div className="card p-3">
          <h5>Editar Aluno</h5>
          <AlunoForm
            alunoToEdit={{ id: aluno.id, nome: aluno.nome, email: aluno.email }}
            onSaved={handleSaved}
          />
        </div>
      )}
      {turmas && turmas.length > 0 && (
        <div className="card p-3 mt-3">
          <h5>Turmas inscritas</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Ano</th>
                  <th>Período</th>
                  <th>Disciplina</th>
                </tr>
              </thead>
              <tbody>
                {turmas.map((t: Turma) => (
                  <tr key={t.id}>
                    <td className="text-center align-middle">{t.id}</td>
                    <td className="align-middle ps-3">
                      <Link to={`/turmas/${t.id}`}>{t.nome}</Link>
                    </td>
                    <td className="align-middle">{t.ano}</td>
                    <td className="align-middle">{t.periodo}</td>
                    <td className="align-middle">
                      {t.disciplina?.nome ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlunoPage;
