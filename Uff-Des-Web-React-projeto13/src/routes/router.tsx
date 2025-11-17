import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import TurmaDetalhePage from "../pages/TurmaDetalhePage";
import Layout from "./Layout";
import AlunosComPaginacaoPage from "../pages/AlunosComPaginacaoPage";
import TurmasComPaginacaoPage from "../pages/TurmasComPaginacaoPage";
import TurmasComAlunosSearchPage from "../pages/TurmasComAlunosSearchPage";
import TurmasComAlunosComboPage from "../pages/TurmasComAlunosComboPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      
      { path: "", element: <HomePage /> },
      { path: "listar-alunos", element: <AlunosComPaginacaoPage /> },
      { path: "listar-turmas", element: <TurmasComPaginacaoPage /> },
      { path: "turmas/:id", element: <TurmaDetalhePage /> },
      { path: "turmas-com-alunos-search", element: <TurmasComAlunosSearchPage /> },
      { path: "turmas-com-alunos-combo", element: <TurmasComAlunosComboPage /> },
    ],
  },
]);
export default router;
