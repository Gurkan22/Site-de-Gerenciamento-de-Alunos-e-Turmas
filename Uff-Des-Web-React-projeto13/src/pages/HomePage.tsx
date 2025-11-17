import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-lg-2">
        <h5>Categorias</h5>
      </div>
      <div className="d-flex flex-row gap-2 mt-2 mb-4">
        <NavLink
          className="btn btn-outline-primary px-4 py-2"
          to="/listar-alunos"
        >
          Todos os Alunos
        </NavLink>
        <NavLink
          className="btn btn-outline-primary px-4 py-2"
          to="/listar-turmas"
        >
          Todas as Turmas
        </NavLink>
        <NavLink
          className="btn btn-outline-primary px-4 py-2"
          to="/turmas-com-alunos"
        >
          Procurar Turmas
        </NavLink>
      </div>
      <img src="/public/UFF2.jpg" alt="Descrição" />
      {/* <div className="col-lg-10">
        <Outlet />
      </div> */}
    </div>
  );
};
export default HomePage;
