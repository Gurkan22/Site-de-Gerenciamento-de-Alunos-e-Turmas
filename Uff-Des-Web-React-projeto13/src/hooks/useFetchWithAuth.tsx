import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/LoginStore";
import useTokenStore from "../store/TokenStore";

const useFetchWithAuth = () => {
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const navigate = useNavigate();

  const fetchWithAuth = async (url: string, options?: any) => {
    const token = tokenResponse.token;

    let newHeaders: Record<string, string> = {};
    if (options && options.headers) {
      newHeaders = { ...options.headers };
    }

    if (token != "") {
      newHeaders["Authorization"] = `Bearer ${token}`;
    }

    options = { ...(options || {}), headers: newHeaders };

    const response = await fetch(url, { ...options });

    if (!response.ok) {
      if (response.status === 401) {
        setLoginInvalido(true);
        setMsg("Necessário estar logado para acessar este recurso.");
        setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
        navigate("/login");
      } else if (response.status === 403) {
        setLoginInvalido(true);
        setMsg("Você não tem permissão para acessar este recurso.");
        setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
        navigate("/login");
      } else {
        // Tentar extrair mensagem de erro do servidor
        const contentType = response.headers.get("content-type");
        let errorMessage = "Erro desconhecido";

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json().catch(() => ({}));
          errorMessage =
            errorData?.message ||
            errorData?.error ||
            JSON.stringify(errorData) ||
            errorMessage;
        } else {
          // Resposta em texto simples (como o GlobalExceptionHandler retorna)
          errorMessage = await response.text().catch(() => "Erro desconhecido");
        }

        throw new Error(errorMessage);
      }
    }
    return response;
  };

  return { fetchWithAuth };
};
export default useFetchWithAuth;
