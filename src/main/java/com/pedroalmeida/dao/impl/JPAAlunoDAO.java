package com.pedroalmeida.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import com.pedroalmeida.dao.AlunoDAO;
import com.pedroalmeida.excecao.AlunoNaoEncontradoException;
import com.pedroalmeida.modelo.Aluno;
import com.pedroalmeida.util.FabricaDeEntityManager;

public class JPAAlunoDAO implements AlunoDAO {
    public long inclui(Aluno umAluno) {
        EntityManager em = null;
        EntityTransaction tx = null;
        try {
            em = FabricaDeEntityManager.criarEntityManager();
            tx = em.getTransaction();
            tx.begin();
            em.persist(umAluno);
            tx.commit();
            return umAluno.getId();
        } catch (RuntimeException e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            if (em != null) em.close();
        }
    }

    public void altera(Aluno umAluno) throws AlunoNaoEncontradoException {
        EntityManager em = null;
        EntityTransaction tx = null;
        try {
            em = FabricaDeEntityManager.criarEntityManager();
            tx = em.getTransaction();
            tx.begin();
            Aluno aluno = em.find(Aluno.class, umAluno.getId());
            if (aluno == null) throw new AlunoNaoEncontradoException("Aluno não encontrado");
            aluno.setNome(umAluno.getNome());
            aluno.setEmail(umAluno.getEmail());
            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            if (em != null) em.close();
        }
    }

    public void exclui(long id) throws AlunoNaoEncontradoException {
        EntityManager em = null;
        EntityTransaction tx = null;
        try {
            em = FabricaDeEntityManager.criarEntityManager();
            tx = em.getTransaction();
            tx.begin();
            Aluno aluno = em.find(Aluno.class, id);
            if (aluno == null) throw new AlunoNaoEncontradoException("Aluno não encontrado");
            em.remove(aluno);
            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            if (em != null) em.close();
        }
    }

    public Aluno recuperaUmAluno(long id) throws AlunoNaoEncontradoException {
        EntityManager em = null;
        try {
            em = FabricaDeEntityManager.criarEntityManager();
            Aluno aluno = em.find(Aluno.class, id);
            if (aluno == null) throw new AlunoNaoEncontradoException("Aluno não encontrado");
            return aluno;
        } finally {
            if (em != null) em.close();
        }
    }

    public List<Aluno> recuperaAlunos() {
        EntityManager em = null;
        try {
            em = FabricaDeEntityManager.criarEntityManager();
            return em.createQuery("from Aluno", Aluno.class).getResultList();
        } finally {
            if (em != null) em.close();
        }
    }
}
