import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

const removerTurmaPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/turmas/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao remover a turma com id = " +
        id +
        ". Status code: " +
        response.status
    );
  }

};

const useRemoverTurmaPorId = () => {
  return useMutation({
    mutationFn: (id: number) => removerTurmaPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["turmas"],
      });
    },
  });
};
export default useRemoverTurmaPorId;
