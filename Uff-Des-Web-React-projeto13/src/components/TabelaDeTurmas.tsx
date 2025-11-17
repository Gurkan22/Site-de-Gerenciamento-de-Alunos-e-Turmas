import { Link } from "react-router-dom";
import type { Turma } from "../interfaces/Turma";

interface Props {
  turmas: Turma[];
  tratarRemocao: (id: number) => void;
}

const TabelaDeTurmas = ({ turmas }: Props) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th className="text-center align-middle">Cód</th>
            <th className="text-center align-middle">Turma</th>
            <th className="text-center align-middle">Disciplina</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr key={turma.id}>
              <td className="text-center align-middle">{turma.id}</td>
              <td className="text-center align-middle">
                {turma.nome}
              </td>
              <td className="text-center align-middle">
                {turma.disciplina?.nome}
              </td>
              <td className="text-center align-middle">
                <Link to={`/turmas/${turma.id}`}>
                  <button type="button" className="btn btn-sm" style={{ backgroundColor: "#1151a3ff", color: "#fff" }}>
                    Exibir Turma
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelaDeTurmas;
