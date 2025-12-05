// Busca alunos de uma turma específica, com paginação
import { URL_BASE } from "./constants";
import useTokenStore from "../store/TokenStore";

export async function recuperarAlunos(
  turmaId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  alunos: Array<{ id: string; nome: string; email: string }>;
  total: number;
}> {
  if (!turmaId) return { alunos: [], total: 0 };

  const token = useTokenStore.getState().tokenResponse.token;
  const headers: Record<string, string> = {};
  if (token && token !== "") headers["Authorization"] = `Bearer ${token}`;

  const resp = await fetch(
    `${URL_BASE}/turmas/${turmaId}/alunos?page=${page}&size=${pageSize}`,
    { headers }
  );
  if (!resp.ok) throw new Error("Erro ao buscar alunos");
  return await resp.json();
}
