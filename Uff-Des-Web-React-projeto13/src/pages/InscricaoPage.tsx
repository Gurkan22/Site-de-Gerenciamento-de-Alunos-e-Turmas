import InscricaoForm from "../components/InscricaoForm";
import Pesquisa from "../components/Pesquisa";
import TabelaDeAlunosPorTurma from "../components/TabelaDeAlunosPorTurma";

const InscricaoPage = () => {
  return (
    <div className="container mt-3">
      <h3>Inscrição de Alunos</h3>
      <InscricaoForm />
      <div className="mt-3">
        <Pesquisa />
      </div>
      <div className="mt-3">
        <TabelaDeAlunosPorTurma />
      </div>
    </div>
  );
};

export default InscricaoPage;
