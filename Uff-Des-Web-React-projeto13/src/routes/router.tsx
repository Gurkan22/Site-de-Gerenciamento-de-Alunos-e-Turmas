import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import TurmaDetalhePage from "../pages/TurmaDetalhePage";
import Layout from "./Layout";
import AlunosComPaginacaoPage from "../pages/AlunosComPaginacaoPage";
import TurmasComPaginacaoPage from "../pages/TurmasComPaginacaoPage";
import TurmasComAlunosSearchPage from "../pages/TurmasComAlunosSearchPage";
import TurmasComAlunosComboPage from "../pages/TurmasComAlunosComboPage";
import InscricaoPage from "../pages/InscricaoPage";
import CadastrarAlunoPage from "../pages/CadastrarAlunoPage";
import AlunoPage from "../pages/AlunoPage";
import LoginPage from "../pages/LoginPage";
import CadastroUsuarioPage from "../pages/CadastroUsuarioPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cadastro", element: <CadastroUsuarioPage /> },
      {
        path: "admin/usuarios",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <AdminUsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "listar-alunos",
        element: (
          <ProtectedRoute>
            <AlunosComPaginacaoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "listar-turmas",
        element: (
          <ProtectedRoute>
            <TurmasComPaginacaoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "turmas/:id",
        element: (
          <ProtectedRoute>
            <TurmaDetalhePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "turmas-com-alunos-search",
        element: (
          <ProtectedRoute>
            <TurmasComAlunosSearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "turmas-com-alunos-combo",
        element: (
          <ProtectedRoute>
            <TurmasComAlunosComboPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "inscricoes",
        element: (
          <ProtectedRoute>
            <InscricaoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cadastrar-aluno",
        element: (
          <ProtectedRoute>
            <CadastrarAlunoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "alunos/:id",
        element: (
          <ProtectedRoute>
            <AlunoPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
