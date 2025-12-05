import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import useApi from "./useApi";

const useRemoverTurmaPorId = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (id: number) => api.removerTurma(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
  });
};

export default useRemoverTurmaPorId;
