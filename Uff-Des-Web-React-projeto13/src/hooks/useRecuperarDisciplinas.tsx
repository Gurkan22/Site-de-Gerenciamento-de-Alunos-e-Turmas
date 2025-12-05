import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarDisciplinas = () => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["disciplinas", token],
    queryFn: () => api.recuperarDisciplinas(),
    enabled: !!token,
  });
};

export default useRecuperarDisciplinas;
