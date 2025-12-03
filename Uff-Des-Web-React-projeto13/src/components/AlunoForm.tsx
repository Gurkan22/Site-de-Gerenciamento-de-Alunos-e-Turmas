import { z } from "zod";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const alunoSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
});

const criarAluno = async (payload: { nome: string; email: string }) => {
  const resp = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Erro ao criar aluno");
  return await resp.json();
};

const atualizarAluno = async (
  id: number,
  payload: { nome: string; email: string }
) => {
  const resp = await fetch(`http://localhost:8080/alunos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Erro ao atualizar aluno");
  return await resp.json();
};

interface Props {
  // quando fornecido, o formulário entra em modo edição
  alunoToEdit?: { id: number; nome: string; email: string } | null;
  onSaved?: (aluno: { id: number; nome: string; email: string }) => void;
}

const AlunoForm = ({ alunoToEdit, onSaved }: Props) => {
  const [nome, setNome] = useState(alunoToEdit?.nome ?? "");
  const [email, setEmail] = useState(alunoToEdit?.email ?? "");
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (alunoToEdit) {
      setNome(alunoToEdit.nome ?? "");
      setEmail(alunoToEdit.email ?? "");
    }
  }, [alunoToEdit]);

  const mutation = useMutation({
    mutationFn: async (payload: { nome: string; email: string }) => {
      if (alunoToEdit?.id) {
        return await atualizarAluno(alunoToEdit.id, payload);
      }
      return await criarAluno(payload);
    },
    onSuccess: (data) => {
      // atualizar cache local
      queryClient.setQueryData(["alunos", String((data as any).id)], data);
      if (onSaved) {
        onSaved(data as any);
      } else {
        navigate(`/alunos/${(data as any).id}`);
      }
    },
    onError: (err) => {
      setErrors(String((err as Error).message ?? err));
    },
  });

  const tratarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    const result = alunoSchema.safeParse({ nome, email });
    if (!result.success) {
      setErrors(result.error.errors.map((x) => x.message).join("; "));
      return;
    }
    mutation.mutate({ nome, email });
  };

  return (
    <form onSubmit={tratarSubmit} className="card p-3">
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errors && <div className="alert alert-danger">{errors}</div>}
      <div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={mutation.status === "pending"}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default AlunoForm;
