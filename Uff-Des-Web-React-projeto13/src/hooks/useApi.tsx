import useFetchWithAuth from "./useFetchWithAuth";
import { URL_BASE } from "../util/constants";
import type { Aluno } from "../interfaces/Aluno";
import type { Turma } from "../interfaces/Turma";
import type { Disciplina } from "../interfaces/Disciplina";
import type { TokenResponse } from "../interfaces/TokenResponse";
import type { UsuarioLogin } from "../interfaces/UsuarioLogin";
import type { Usuario } from "../interfaces/Usuario";

const useApi = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  // ==================== AUTENTICAÇÃO ====================
  const login = async (credentials: UsuarioLogin): Promise<TokenResponse> => {
    const resp = await fetch(`${URL_BASE}/autenticacao/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!resp.ok) {
      const error = await resp
        .json()
        .catch(() => ({ message: "Erro ao fazer login" }));
      throw new Error(error.message || "Erro ao fazer login");
    }
    return await resp.json();
  };

  const cadastrarUsuarioPublico = async (
    usuario: Omit<Usuario, "id" | "role">
  ): Promise<Usuario> => {
    const resp = await fetch(`${URL_BASE}/autenticacao/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    if (!resp.ok) {
      const error = await resp.text();
      throw new Error(error || "Erro ao cadastrar usuário");
    }
    return await resp.json();
  };

  const cadastrarUsuarioPorAdmin = async (
    usuario: Usuario
  ): Promise<Usuario> => {
    const resp = await fetchWithAuth(
      `${URL_BASE}/autenticacao/usuarios/admin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      }
    );
    if (!resp.ok) {
      const error = await resp.text();
      throw new Error(error || "Erro ao cadastrar usuário");
    }
    return await resp.json();
  };

  // ==================== ALUNOS ====================
  const recuperarAlunos = async (): Promise<Aluno[]> => {
    const resp = await fetchWithAuth(`${URL_BASE}/alunos`);
    if (!resp.ok) throw new Error("Erro ao recuperar alunos");
    return await resp.json();
  };

  const recuperarAlunoPorId = async (id: number): Promise<Aluno> => {
    const resp = await fetchWithAuth(`${URL_BASE}/alunos/${id}`);
    if (!resp.ok) throw new Error("Erro ao recuperar aluno");
    return await resp.json();
  };

  const cadastrarAluno = async (aluno: Aluno): Promise<Aluno> => {
    const resp = await fetchWithAuth(`${URL_BASE}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });
    if (!resp.ok) throw new Error("Erro ao cadastrar aluno");
    return await resp.json();
  };

  const atualizarAluno = async (id: number, aluno: Aluno): Promise<Aluno> => {
    const resp = await fetchWithAuth(`${URL_BASE}/alunos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });
    if (!resp.ok) throw new Error("Erro ao atualizar aluno");
    return await resp.json();
  };

  const removerAluno = async (id: number): Promise<void> => {
    const resp = await fetchWithAuth(`${URL_BASE}/alunos/${id}`, {
      method: "DELETE",
    });
    if (!resp.ok) throw new Error("Erro ao remover aluno");
  };

  const recuperarAlunosComPaginacao = async (
    pagina: number,
    tamanho: number
  ): Promise<any> => {
    const resp = await fetchWithAuth(
      `${URL_BASE}/alunos/paginacao?pagina=${pagina}&tamanho=${tamanho}`
    );
    if (!resp.ok) throw new Error("Erro ao recuperar alunos paginados");
    return await resp.json();
  };

  // ==================== TURMAS ====================
  const recuperarTurmas = async (): Promise<Turma[]> => {
    const resp = await fetchWithAuth(`${URL_BASE}/turmas`);
    if (!resp.ok) throw new Error("Erro ao recuperar turmas");
    return await resp.json();
  };

  const recuperarTurmaPorId = async (id: number): Promise<Turma> => {
    const resp = await fetchWithAuth(`${URL_BASE}/turmas/${id}`);
    if (!resp.ok) throw new Error("Erro ao recuperar turma");
    return await resp.json();
  };

  const recuperarTurmasFiltradas = async (nome: string): Promise<Turma[]> => {
    const resp = await fetchWithAuth(
      `${URL_BASE}/turmas/search?nome=${encodeURIComponent(nome)}`
    );
    if (!resp.ok) throw new Error("Erro ao buscar turmas");
    return await resp.json();
  };

  const recuperarAlunosDaTurmaComPaginacao = async (
    turmaId: number,
    pagina: number,
    tamanho: number
  ): Promise<any> => {
    const resp = await fetchWithAuth(
      `${URL_BASE}/turmas/${turmaId}/alunos/paginacao?pagina=${pagina}&tamanho=${tamanho}`
    );
    if (!resp.ok) throw new Error("Erro ao recuperar alunos da turma");
    return await resp.json();
  };

  const recuperarAlunosDaTurma = async (turmaId: number): Promise<Aluno[]> => {
    const resp = await fetchWithAuth(`${URL_BASE}/turmas/${turmaId}/alunos`);
    if (!resp.ok) throw new Error("Erro ao recuperar alunos da turma");
    return await resp.json();
  };

  const cadastrarTurma = async (turma: Turma): Promise<Turma> => {
    const resp = await fetchWithAuth(`${URL_BASE}/turmas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turma),
    });
    if (!resp.ok) throw new Error("Erro ao cadastrar turma");
    return await resp.json();
  };

  const atualizarTurma = async (id: number, turma: Turma): Promise<Turma> => {
    const resp = await fetchWithAuth(`${URL_BASE}/turmas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turma),
    });
    if (!resp.ok) throw new Error("Erro ao atualizar turma");
    return await resp.json();
  };

  const removerTurma = async (id: number): Promise<void> => {
    const resp = await fetchWithAuth(`${URL_BASE}/turmas/${id}`, {
      method: "DELETE",
    });
    if (!resp.ok) throw new Error("Erro ao remover turma");
  };

  const recuperarTurmasComPaginacao = async (
    pagina: string,
    tamanho: string,
    nome: string
  ): Promise<any> => {
    const resp = await fetchWithAuth(
      `${URL_BASE}/turmas/paginacao?pagina=${pagina}&tamanho=${tamanho}&nome=${encodeURIComponent(
        nome
      )}`
    );
    if (!resp.ok) throw new Error("Erro ao recuperar turmas paginadas");
    return await resp.json();
  };

  const recuperarTurmasPorDisciplina = async (
    disciplinaId?: number | null
  ): Promise<Turma[]> => {
    if (!disciplinaId) return [];
    const resp = await fetchWithAuth(`${URL_BASE}/turmas`);
    if (!resp.ok) throw new Error("Erro ao recuperar turmas");
    const todas: Turma[] = await resp.json();
    return todas.filter(
      (t) => t.disciplina && (t.disciplina as any).id === disciplinaId
    );
  };

  const recuperarAlunosDisponiveisParaTurma = async (
    turmaId?: number | null
  ): Promise<Aluno[]> => {
    if (!turmaId) return [];
    const [todosResp, inscritosResp] = await Promise.all([
      fetchWithAuth(`${URL_BASE}/alunos`),
      fetchWithAuth(`${URL_BASE}/turmas/${turmaId}/alunos`),
    ]);

    if (!todosResp.ok) throw new Error("Erro ao recuperar alunos");
    if (!inscritosResp.ok) throw new Error("Erro ao recuperar alunos da turma");

    const todosJson = await todosResp.json();
    const inscritosJson = await inscritosResp.json();

    const todos: Aluno[] = Array.isArray(todosJson)
      ? todosJson
      : todosJson?.itens ?? [];
    const inscritos: Aluno[] = Array.isArray(inscritosJson)
      ? inscritosJson
      : inscritosJson?.itens ?? [];

    const idsInscritos = new Set(inscritos.map((a) => a.id));
    return todos.filter((a) => !idsInscritos.has(a.id));
  };

  // ==================== DISCIPLINAS ====================
  const recuperarDisciplinas = async (): Promise<Disciplina[]> => {
    const resp = await fetchWithAuth(`${URL_BASE}/disciplinas`);
    if (!resp.ok) throw new Error("Erro ao recuperar disciplinas");
    return await resp.json();
  };

  // ==================== INSCRIÇÕES ====================
  const inscreverAluno = async (
    alunoId: number,
    turmaId: number
  ): Promise<any> => {
    const payload = { aluno: { id: alunoId }, turma: { id: turmaId } };
    const resp = await fetchWithAuth(`${URL_BASE}/inscricoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error("Erro ao inscrever aluno: " + text);
    }
    return await resp.json();
  };

  const removerInscricao = async (
    turmaId: number,
    alunoId: number
  ): Promise<void> => {
    const resp = await fetchWithAuth(
      `${URL_BASE}/turmas/${turmaId}/alunos/${alunoId}`,
      {
        method: "DELETE",
      }
    );
    if (!resp.ok) throw new Error("Erro ao remover inscrição");
  };

  return {
    // Autenticação
    login,
    cadastrarUsuarioPublico,
    cadastrarUsuarioPorAdmin,

    // Alunos
    recuperarAlunos,
    recuperarAlunoPorId,
    cadastrarAluno,
    atualizarAluno,
    removerAluno,
    recuperarAlunosComPaginacao,
    recuperarAlunosDisponiveisParaTurma,

    // Turmas
    recuperarTurmas,
    recuperarTurmaPorId,
    recuperarTurmasFiltradas,
    recuperarAlunosDaTurmaComPaginacao,
    recuperarAlunosDaTurma,
    cadastrarTurma,
    atualizarTurma,
    removerTurma,
    recuperarTurmasComPaginacao,
    recuperarTurmasPorDisciplina,

    // Disciplinas
    recuperarDisciplinas,

    // Inscrições
    inscreverAluno,
    removerInscricao,
  };
};

export default useApi;
