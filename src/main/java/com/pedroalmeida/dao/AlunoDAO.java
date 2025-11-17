package com.pedroalmeida.dao;

import java.util.List;

import com.pedroalmeida.excecao.AlunoNaoEncontradoException;
import com.pedroalmeida.modelo.Aluno;

public interface AlunoDAO {
    long inclui(Aluno umAluno);
    void altera(Aluno umAluno) throws AlunoNaoEncontradoException;
    void exclui(long id) throws AlunoNaoEncontradoException;
    Aluno recuperaUmAluno(long id) throws AlunoNaoEncontradoException;
    List<Aluno> recuperaAlunos();
}
