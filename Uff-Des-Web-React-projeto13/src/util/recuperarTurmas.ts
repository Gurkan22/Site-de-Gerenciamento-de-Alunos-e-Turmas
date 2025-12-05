// Busca turmas filtrando pelo texto digitado
import { URL_BASE } from "./constants";
import useTokenStore from "../store/TokenStore";

export async function recuperarTurmas(
  search: string
): Promise<Array<{ id: string; nome: string }>> {
  if (!search) return [];

  const token = useTokenStore.getState().tokenResponse.token;
  const headers: Record<string, string> = {};
  if (token && token !== "") headers["Authorization"] = `Bearer ${token}`;

  const resp = await fetch(
    `${URL_BASE}/turmas/search?nome=${encodeURIComponent(search)}`,
    { headers }
  );
  if (!resp.ok) throw new Error("Erro ao buscar turmas");
  return await resp.json();
}
