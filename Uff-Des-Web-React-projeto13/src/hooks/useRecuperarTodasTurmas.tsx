import { useQuery } from "@tanstack/react-query";
import type { Turma } from "../interfaces/Turma";

const recuperarTodasTurmas = async (): Promise<Turma[]> => {
  const response = await fetch("http://localhost:8080/turmas");
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar todas as turmas. Status code: " +
        response.status
    );
  }
  return await response.json();
};

const useRecuperarTodasTurmas = () => {
  return useQuery({
    queryKey: ["turmas", "todas"],
    queryFn: recuperarTodasTurmas,
  });
};

export default useRecuperarTodasTurmas;
