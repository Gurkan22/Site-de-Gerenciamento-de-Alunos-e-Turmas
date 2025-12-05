package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Aluno;
import com.carlosribeiro.apirestful.repository.AlunoRepository;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;

import org.springframework.dao.DataIntegrityViolationException;
import com.carlosribeiro.apirestful.exception.EntidadeEmUsoException;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class AlunoService {
    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public Aluno salvar(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public Aluno atualizar(Long id, Aluno aluno) {
        Aluno existente = alunoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Aluno não encontrado"));
        existente.setNome(aluno.getNome());
        existente.setEmail(aluno.getEmail());
        return alunoRepository.save(existente);
    }

    public void remover(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Aluno não encontrado");
        }
        try {
            alunoRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new EntidadeEmUsoException(
                    "Aluno inscrito em uma turma ou mais, remova todas as inscrições antes de remover o aluno");
        }
    }

    public Aluno buscarPorId(Long id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Aluno não encontrado"));
    }

    public java.util.List<com.carlosribeiro.apirestful.model.Inscricao> buscarInscricoesPorAluno(Long alunoId) {
        throw new UnsupportedOperationException("buscarInscricoesPorAluno deve ser implementado no InscricaoService");
    }

    public List<Aluno> buscarTodos() {
        return alunoRepository.findAll();
    }

    public Page<Aluno> listarPaginado(Pageable pageable) {
        return alunoRepository.findAll(pageable);
    }
}
