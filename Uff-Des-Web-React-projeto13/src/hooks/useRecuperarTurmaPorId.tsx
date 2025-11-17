import { useQuery } from "@tanstack/react-query";

const recuperarTurmaPorId = async (id?: number | null) => {
  if (!id) return null;
  const resp = await fetch(`http://localhost:8080/turmas/${id}`);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
};

const useRecuperarTurmaPorId = (id?: number | null) => {
  return useQuery({
    queryKey: ["turmas", id],
    queryFn: () => recuperarTurmaPorId(id),
    enabled: !!id,
    staleTime: 1000 * 60, // 1 min
  });
};

export default useRecuperarTurmaPorId;
