import type { ReactNode } from "react";

interface Props {
  pagina: number;
  totalDePaginas: number;
  tratarPaginacao: (pagina: number) => void;
}
const Paginacao = ({ pagina, totalDePaginas, tratarPaginacao }: Props) => {
  const arrayDePaginas: ReactNode[] = [];

  if (totalDePaginas < 2) return;

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={pagina === i ? "page-item active" : "page-item"}>
        <a
          onClick={() => tratarPaginacao(i)}
          className="page-link"
          style={
            pagina === i
              ? { backgroundColor: "#1151a3ff", color: "#fff" }
              : { backgroundColor: "#fff", color: "#1151a3ff" }
          }
          aria-current="page"
        >
          {i + 1}
        </a>
      </li>
    );
  }
  return (
    <nav aria-label="paginação">
      <ul className="pagination">
        <li
          onClick={pagina === 0 ? undefined : () => tratarPaginacao(pagina - 1)}
          className={pagina === 0 ? "page-item disabled" : "page-item"}
        >
          <a
            className="page-link"
            style={
              pagina === 0
                ? { color: "#6c757d" } // cinza do Bootstrap
                : { color: "#1151a3ff" }
            }
          >
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li
          onClick={
            pagina === totalDePaginas - 1
              ? undefined
              : () => tratarPaginacao(pagina + 1)
          }
          className={
            pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            style={
              pagina === totalDePaginas - 1
                ? { color: "#6c757d" }
                : { color: "#1151a3ff" }
            }
          >
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginacao;
