import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarTurmaPorId = (id?: number) => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["turmas", id, token],
    queryFn: () => api.recuperarTurmaPorId(id!),
    enabled: !!id && !!token,
  });
};

export default useRecuperarTurmaPorId;
