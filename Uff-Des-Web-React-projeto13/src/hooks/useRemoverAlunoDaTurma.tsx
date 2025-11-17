import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

const removerAlunoDaTurma = async (turmaId: number, alunoId: number) => {
  const response = await fetch(
    `http://localhost:8080/turmas/${turmaId}/alunos/${alunoId}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error(
      `Erro ao remover aluno ${alunoId} da turma ${turmaId}. Status: ${response.status}`
    );
  }
};

const useRemoverAlunoDaTurma = () => {
  return useMutation({
    mutationFn: ({ turmaId, alunoId }: { turmaId: number; alunoId: number }) =>
      removerAlunoDaTurma(turmaId, alunoId),
    onSuccess: (_, { turmaId }) => {
      queryClient.invalidateQueries({
        queryKey: ["turmas", turmaId, "alunos", "paginacao"],
      });
    },
  });
};

export default useRemoverAlunoDaTurma;
