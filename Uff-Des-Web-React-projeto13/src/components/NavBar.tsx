import { NavLink } from "react-router-dom";
import UFF from "../assets/UFF.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={UFF} width="50px" alt="logo" />
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                <i className="bi bi-house-door-fill me-1"></i>
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/listar-alunos">
                <i className="bi bi-people-fill me-1"></i>
                Listar Alunos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/listar-turmas">
                <i className="bi bi-card-list me-1"></i>
                Listar Turmas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/turmas-com-alunos-search">
                <i className="bi bi-search me-1"></i>
                Procurar Turmas (Search)
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/turmas-com-alunos-combo">
                <i className="bi bi-search me-1"></i>
                Procurar Turmas (Combo)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
