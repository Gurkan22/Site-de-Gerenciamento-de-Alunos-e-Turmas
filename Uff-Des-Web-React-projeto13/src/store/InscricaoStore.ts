import create from "zustand";

interface InscricaoState {
  disciplinaId?: number | null;
  turmaId?: number | null;
  alunoId?: number | null;
  inscritos?: import("../interfaces/Aluno").Aluno[];
  pesquisa: string;
  pagina: number;
  setInscritos: (alunos: import("../interfaces/Aluno").Aluno[]) => void;
  setDisciplinaId: (id?: number | null) => void;
  setTurmaId: (id?: number | null) => void;
  setAlunoId: (id?: number | null) => void;
  setPesquisa: (texto: string) => void;
  setPagina: (p: number) => void;
  limparTudo: () => void;
}

const useInscricaoStore = create<InscricaoState>((set) => ({
  disciplinaId: undefined,
  turmaId: undefined,
  alunoId: undefined,
  pesquisa: "",
  pagina: 0,
  inscritos: undefined,
  setInscritos: (alunos) => set(() => ({ inscritos: alunos })),
  setDisciplinaId: (id) => set(() => ({ disciplinaId: id })),
  setTurmaId: (id) => set(() => ({ turmaId: id })),
  setAlunoId: (id) => set(() => ({ alunoId: id })),
  setPesquisa: (texto) => set(() => ({ pesquisa: texto })),
  setPagina: (p) => set(() => ({ pagina: p })),
  limparTudo: () =>
    set(() => ({
      disciplinaId: undefined,
      turmaId: undefined,
      alunoId: undefined,
      pesquisa: "",
      pagina: 0,
    })),
}));

export default useInscricaoStore;
