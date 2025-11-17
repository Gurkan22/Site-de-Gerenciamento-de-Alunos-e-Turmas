import { useMutation, useQueryClient } from "@tanstack/react-query";
import useInscricaoStore from "../store/InscricaoStore";
import DisciplinaComboBox from "./DisciplinaComboBox";
import TurmaComboBox from "./TurmaComboBox";
import AlunoComboBox from "./AlunoComboBox";

const inscreverAluno = async ({
  alunoId,
  turmaId,
}: {
  alunoId?: number | null;
  turmaId?: number | null;
}) => {
  if (!alunoId || !turmaId) throw new Error("aluno ou turma inválidos");
  // backend espera um objeto Inscricao com nested aluno e turma ({ aluno: { id }, turma: { id } })
  const payload = { aluno: { id: alunoId }, turma: { id: turmaId } };
  const resp = await fetch("http://localhost:8080/inscricoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("Erro ao inscrever aluno: " + text);
  }
  return await resp.json();
};

const InscricaoForm = () => {
  const queryClient = useQueryClient();
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const alunoId = useInscricaoStore((s) => s.alunoId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);
  const inscritos = useInscricaoStore((s) => s.inscritos);
  const setInscritos = useInscricaoStore((s) => s.setInscritos);

  const mutation = useMutation({
    mutationFn: () => inscreverAluno({ alunoId, turmaId }),
    onSuccess: (data: any) => {
      // data deve conter a inscrição criada com aluno e turma
      const inscricao = data as any;
      const aluno = inscricao?.aluno;
      // atualizar cache localmente para melhorar UX (optimistic-ish):
      if (aluno && turmaId) {
        // atualizar lista de alunos da turma (pre-pend)
        queryClient.setQueryData(["turmas", turmaId, "alunos"], (old: any) => {
          const existing: any[] = Array.isArray(old) ? old : [];
          // remover duplicatas e adicionar no topo
          const filtered = existing.filter((a) => a.id !== aluno.id);
          return [aluno, ...filtered];
        });

        // atualizar lista de não-inscritos (remover o aluno recém inscrito)
        queryClient.setQueryData(
          ["alunos", "nao-inscritos", turmaId],
          (old: any) => {
            if (!Array.isArray(old)) return old;
            return old.filter((a: any) => a.id !== aluno.id);
          }
        );

        // atualizar store de inscritos
        setInscritos([aluno, ...(inscritos ?? [])]);
      }

      // invalidar para garantir consistência server-side
      queryClient.invalidateQueries({
        queryKey: ["turmas", turmaId, "alunos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["alunos", "nao-inscritos", turmaId],
      });

      // limpar seleção do combo de aluno
      setAlunoId(undefined);
    },
    onError: (err) => {
      console.error("Erro na mutação de inscrição:", err);
      alert(
        "Erro ao inscrever aluno: " + String((err as Error).message ?? err)
      );
    },
  });

  return (
    <div className="card p-3 mb-3">
      <h5>Inscrição de Aluno em Turma</h5>
      <div className="row">
        <div className="col-md-4">
          <DisciplinaComboBox />
        </div>
        <div className="col-md-4">
          <TurmaComboBox />
        </div>
        <div className="col-md-4">
          <AlunoComboBox />
        </div>
      </div>
      <div className="mt-2">
        <button
          disabled={
            !alunoId || !turmaId || ((mutation as any)?.isLoading ?? false)
          }
          onClick={() => mutation.mutate()}
          className="btn btn-primary"
        >
          Inscrever Aluno
        </button>
      </div>
    </div>
  );
};

export default InscricaoForm;
