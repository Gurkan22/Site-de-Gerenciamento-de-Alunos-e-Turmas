// Busca turmas filtrando pelo texto digitado
export async function recuperarTurmas(
  search: string
): Promise<Array<{ id: string; nome: string }>> {
  if (!search) return [];
  const resp = await fetch(
    `/api/turmas/search?nome=${encodeURIComponent(search)}`
  );
  if (!resp.ok) throw new Error("Erro ao buscar turmas");
  return await resp.json();
}
