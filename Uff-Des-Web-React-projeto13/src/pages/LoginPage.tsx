import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../store/TokenStore";
import useLoginStore from "../store/LoginStore";
import { URL_BASE } from "../util/constants";

const schema = z.object({
  email: z.string().email(),
  senha: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);
  const msg = useLoginStore((s) => s.msg);
  const loginInvalido = useLoginStore((s) => s.loginInvalido);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const resp = await fetch(`${URL_BASE}/autenticacao/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        setLoginInvalido(true);
        setMsg(err?.message || "Erro ao efetuar login");
        return;
      }
      const tokenResp = await resp.json();
      setTokenResponse(tokenResp);
      setLoginInvalido(false);
      setMsg("");
      navigate("/");
    } catch (e: any) {
      setLoginInvalido(true);
      setMsg(e?.message || "Erro desconhecido");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>
      {msg && (
        <div
          className={`alert ${loginInvalido ? "alert-danger" : "alert-info"}`}
        >
          {msg}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" {...register("email")} />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            {...register("senha")}
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Criar conta
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
