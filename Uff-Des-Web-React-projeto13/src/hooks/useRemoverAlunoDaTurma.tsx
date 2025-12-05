import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import useApi from "./useApi";

const useRemoverAlunoDaTurma = () => {
  const api = useApi();

  return useMutation({
    mutationFn: ({ turmaId, alunoId }: { turmaId: number; alunoId: number }) =>
      api.removerInscricao(turmaId, alunoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    },
  });
};

export default useRemoverAlunoDaTurma;
