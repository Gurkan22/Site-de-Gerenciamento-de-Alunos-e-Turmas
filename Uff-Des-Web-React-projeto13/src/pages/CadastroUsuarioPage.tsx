import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../util/constants";

const schema = z
  .object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

const CadastroUsuarioPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { confirmarSenha, ...usuario } = data;
      const resp = await fetch(`${URL_BASE}/autenticacao/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (resp.ok) {
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        navigate("/login");
      } else {
        const error = await resp.text();
        alert("Erro ao cadastrar: " + error);
      }
    } catch (e: any) {
      alert("Erro ao cadastrar: " + (e?.message || "Erro desconhecido"));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Criar Conta</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    className={`form-control ${
                      errors.nome ? "is-invalid" : ""
                    }`}
                    {...register("nome")}
                  />
                  {errors.nome && (
                    <div className="invalid-feedback">
                      {errors.nome.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.senha ? "is-invalid" : ""
                    }`}
                    {...register("senha")}
                  />
                  {errors.senha && (
                    <div className="invalid-feedback">
                      {errors.senha.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirmar Senha</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmarSenha ? "is-invalid" : ""
                    }`}
                    {...register("confirmarSenha")}
                  />
                  {errors.confirmarSenha && (
                    <div className="invalid-feedback">
                      {errors.confirmarSenha.message}
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Cadastrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/login")}
                  >
                    Voltar ao Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuarioPage;
