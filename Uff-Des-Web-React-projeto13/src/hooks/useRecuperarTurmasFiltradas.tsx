import { useQuery } from "@tanstack/react-query";
import type { Turma } from "../interfaces/Turma";

const recuperarTurmasFiltradas = async (nome: string): Promise<Turma[]> => {
  if (!nome) return [];
  const response = await fetch(
    `http://localhost:8080/turmas/search?nome=${encodeURIComponent(nome)}`
  );
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar turmas filtradas. Status code: " +
        response.status
    );
  }
  return await response.json();
};

const useRecuperarTurmasFiltradas = (nome: string) => {
  return useQuery({
    queryKey: ["turmas", "filtradas", nome],
    queryFn: () => recuperarTurmasFiltradas(nome),
    enabled: !!nome,
  });
};

export default useRecuperarTurmasFiltradas;
