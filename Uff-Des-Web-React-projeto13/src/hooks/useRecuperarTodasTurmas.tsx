import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import useTokenStore from "../store/TokenStore";

const useRecuperarTodasTurmas = () => {
  const api = useApi();
  const token = useTokenStore((s) => s.tokenResponse.token);

  return useQuery({
    queryKey: ["turmas", token],
    queryFn: () => api.recuperarTurmas(),
    enabled: !!token,
  });
};

export default useRecuperarTodasTurmas;
