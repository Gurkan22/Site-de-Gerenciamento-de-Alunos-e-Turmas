import useInscricaoStore from "../store/InscricaoStore";

const Pesquisa = () => {
  const pesquisa = useInscricaoStore((s) => s.pesquisa);
  const setPesquisa = useInscricaoStore((s) => s.setPesquisa);

  return (
    <div className="mb-3">
      <label className="form-label">Pesquisa</label>
      <input
        className="form-control"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Informe o nome de um aluno"
      />
    </div>
  );
};

export default Pesquisa;
