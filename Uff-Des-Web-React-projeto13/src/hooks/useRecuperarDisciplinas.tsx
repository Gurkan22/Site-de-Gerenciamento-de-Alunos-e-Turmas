import { useQuery } from "@tanstack/react-query";
import type { Disciplina } from "../interfaces/Disciplina";

const recuperarDisciplinas = async (): Promise<Disciplina[]> => {
  const resp = await fetch("http://localhost:8080/disciplinas");
  if (!resp.ok) throw new Error("Erro ao recuperar disciplinas");
  return await resp.json();
};

const useRecuperarDisciplinas = () => {
  return useQuery({ queryKey: ["disciplinas"], queryFn: recuperarDisciplinas });
};

export default useRecuperarDisciplinas;
