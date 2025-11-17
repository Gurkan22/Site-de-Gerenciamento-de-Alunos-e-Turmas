// Busca alunos de uma turma específica, com paginação
export async function recuperarAlunos(
  turmaId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  alunos: Array<{ id: string; nome: string; email: string; cpf: string }>;
  total: number;
}> {
  if (!turmaId) return { alunos: [], total: 0 };
  const resp = await fetch(
    `/api/turmas/${turmaId}/alunos?page=${page}&size=${pageSize}`
  );
  if (!resp.ok) throw new Error("Erro ao buscar alunos");
  return await resp.json();
}
