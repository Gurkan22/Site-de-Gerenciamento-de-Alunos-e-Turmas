import { NavLink, useNavigate } from "react-router-dom";
import UFF from "../assets/UFF.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import useTokenStore from "../store/TokenStore";

const NavBar = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const navigate = useNavigate();

  const logout = () => {
    setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
    navigate("/login");
  };

  const isAdmin = tokenResponse.role === "ADMIN";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={UFF}
            width="45"
            alt="logo"
            className="me-2"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="fw-bold fs-5">Sistema Acadêmico</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link px-3" aria-current="page" to="/">
                <i className="bi bi-house-door-fill me-2"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle px-3"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-people-fill me-2"></i>
                Alunos
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/listar-alunos">
                    <i className="bi bi-list-ul me-2"></i>
                    Listar Alunos
                  </NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink className="dropdown-item" to="/cadastrar-aluno">
                      <i className="bi bi-person-plus me-2"></i>
                      Cadastrar Aluno
                    </NavLink>
                  </li>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle px-3"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-journal-text me-2"></i>
                Turmas
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/listar-turmas">
                    <i className="bi bi-card-list me-2"></i>
                    Listar Turmas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/turmas-com-alunos-combo"
                  >
                    <i className="bi bi-search me-2"></i>
                    Buscar (Combo)
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/turmas-com-alunos-search"
                  >
                    <i className="bi bi-search me-2"></i>
                    Buscar (Search)
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/inscricoes">
                <i className="bi bi-journal-plus me-2"></i>
                Inscrições
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link px-3" to="/admin/usuarios">
                  <i className="bi bi-person-gear me-2"></i>
                  Usuários
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {tokenResponse.token ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle px-3"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {tokenResponse.nome}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text text-muted small">
                        {tokenResponse.role === "ADMIN"
                          ? "Administrador"
                          : "Usuário"}
                      </span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sair
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link px-3" to="/login">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Entrar
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
