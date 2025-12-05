import { NavLink } from "react-router-dom";
import useTokenStore from "../store/TokenStore";

const HomePage = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const isAdmin = tokenResponse.role === "ADMIN";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 position-relative p-0">
          <div
            className="position-relative"
            style={{
              height: "400px",
              backgroundImage: "url(/UFF2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "rgba(13, 110, 253, 0.7)" }}
            ></div>
            <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100">
              <h1 className="display-4 fw-bold mb-3">Sistema Acadêmico UFF</h1>
              <p className="lead mb-4">Gestão de Alunos, Turmas e Inscrições</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4 fw-bold text-primary">
            Acesso Rápido
          </h3>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-3">
              <NavLink to="/listar-alunos" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-people-fill text-primary"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">Alunos</h5>
                    <p className="card-text text-muted small">
                      Visualize todos os alunos cadastrados
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-md-6 col-lg-3">
              <NavLink to="/listar-turmas" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-journal-text text-success"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">Turmas</h5>
                    <p className="card-text text-muted small">
                      Consulte todas as turmas disponíveis
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-md-6 col-lg-3">
              <NavLink to="/inscricoes" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-journal-plus text-info"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">Inscrições</h5>
                    <p className="card-text text-muted small">
                      Gerencie inscrições de alunos
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-md-6 col-lg-3">
              <NavLink
                to="/turmas-com-alunos-search"
                className="text-decoration-none"
              >
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-search text-warning"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">Buscar</h5>
                    <p className="card-text text-muted small">
                      Procure turmas por disciplina
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="row mb-5">
          <div className="col-12">
            <div
              className="alert alert-primary border-0 shadow-sm"
              role="alert"
            >
              <h5 className="alert-heading mb-3">
                <i className="bi bi-shield-check me-2"></i>
                Área Administrativa
              </h5>
              <p className="mb-3">
                Você está logado como administrador. Acesso rápido às funções
                administrativas:
              </p>
              <hr />
              <div className="d-flex gap-3 flex-wrap">
                <NavLink to="/cadastrar-aluno" className="btn btn-primary">
                  <i className="bi bi-person-plus me-2"></i>
                  Cadastrar Aluno
                </NavLink>
                <NavLink
                  to="/admin/usuarios"
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-person-gear me-2"></i>
                  Gerenciar Usuários
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};
export default HomePage;
