import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import { URL_BASE } from "../util/constants";

const schema = z
  .object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string(),
    role: z.enum(["USER", "ADMIN"]).default("USER"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

const AdminUsersPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { fetchWithAuth } = useFetchWithAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const { confirmarSenha, ...usuario } = data;
      const resp = await fetchWithAuth(
        `${URL_BASE}/autenticacao/usuarios/admin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );
      if (resp.ok) {
        alert("Usuário criado com sucesso");
        reset();
      }
    } catch (e: any) {
      alert(e?.message || "Erro ao criar usuário");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                Gerenciar Usuários (ADMIN)
              </h3>
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
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" {...register("role")}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Criar Usuário
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

export default AdminUsersPage;
