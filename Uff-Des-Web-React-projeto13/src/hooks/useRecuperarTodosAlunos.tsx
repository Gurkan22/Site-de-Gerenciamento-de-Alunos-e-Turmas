import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";

const recuperarTodosAlunos = async (): Promise<Aluno[]> => {
  const resp = await fetch("http://localhost:8080/alunos");
  if (!resp.ok) throw new Error("Erro ao recuperar alunos");
  return resp.json();
};

const useRecuperarTodosAlunos = () => {
  return useQuery({
    queryKey: ["alunos", "todos"],
    queryFn: recuperarTodosAlunos,
    staleTime: 1000 * 60, // 1 min
  });
};

export default useRecuperarTodosAlunos;
