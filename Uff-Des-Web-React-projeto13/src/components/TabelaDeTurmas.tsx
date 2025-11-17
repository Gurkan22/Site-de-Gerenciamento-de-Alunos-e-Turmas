// import { Link } from "react-router-dom";
import type { Turma } from "../interfaces/Turma";

interface Props {
  turmas: Turma[];
  turmaSelecionada: Turma | null;
  onSelecionar: (turma: Turma) => void;
  tratarRemocao: (id: number) => void;
}

const TabelaDeTurmas = ({ turmas, turmaSelecionada, onSelecionar }: Props) => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {turmas.map((turma) => (
        <li key={turma.id} style={{ marginBottom: 8 }}>
          <button
            type="button"
            className={`btn btn-outline-primary px-4 py-2 w-100${
              turmaSelecionada?.id === turma.id ? " active" : ""
            }`}
            style={{
              fontWeight:
                turmaSelecionada?.id === turma.id ? "bold" : undefined,
            }}
            onClick={() => onSelecionar(turma)}
          >
            {turma.nome}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default TabelaDeTurmas;
