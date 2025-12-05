import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import useApi from "./useApi";

const useRemoverAlunoPorId = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (id: number) => api.removerAluno(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    },
  });
};

export default useRemoverAlunoPorId;
