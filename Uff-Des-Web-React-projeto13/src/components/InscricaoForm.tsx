import { useMutation, useQueryClient } from "@tanstack/react-query";
import useInscricaoStore from "../store/InscricaoStore";
import DisciplinaComboBox from "./DisciplinaComboBox";
import TurmaComboBox from "./TurmaComboBox";
import AlunoComboBox from "./AlunoComboBox";
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import { URL_BASE } from "../util/constants";

const InscricaoForm = () => {
  const queryClient = useQueryClient();
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const alunoId = useInscricaoStore((s) => s.alunoId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);
  const inscritos = useInscricaoStore((s) => s.inscritos);
  const setInscritos = useInscricaoStore((s) => s.setInscritos);
  const { fetchWithAuth } = useFetchWithAuth();

  const inscreverAluno = async ({
    alunoId,
    turmaId,
  }: {
    alunoId?: number | null;
    turmaId?: number | null;
  }) => {
    if (!alunoId || !turmaId) throw new Error("aluno ou turma inválidos");
    const payload = { aluno: { id: alunoId }, turma: { id: turmaId } };
    const resp = await fetchWithAuth(`${URL_BASE}/inscricoes`, {
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

  const mutation = useMutation({
    mutationFn: () => inscreverAluno({ alunoId, turmaId }),
    onSuccess: (data: any) => {
      // data deve conter a inscrição criada com aluno e turma
      const inscricao = data as any;
      const aluno = inscricao?.aluno ?? inscricao?.alunoDto ?? inscricao; // aceitar algumas formas possíveis
      if (!aluno) {
        console.warn("Inscrição retornou sem objeto 'aluno':", inscricao);
      }

      // limpar seleção do combo de aluno ANTES de invalidar
      setAlunoId(undefined);

      // invalidar e forçar refetch imediato com a chave correta
      queryClient.invalidateQueries({
        queryKey: ["alunos", "disponiveis", turmaId],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["turmas", turmaId, "alunos"],
        refetchType: "active",
      });

      // atualizar store de inscritos
      if (aluno) {
        setInscritos([aluno, ...(inscritos ?? [])]);
      }
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
