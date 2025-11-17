package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.repository.TurmaRepository;
import com.carlosribeiro.apirestful.exception.EntidadeEmUsoException;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class TurmaService {
    private final TurmaRepository turmaRepository;
    private final com.carlosribeiro.apirestful.repository.InscricaoRepository inscricaoRepository;

    public TurmaService(TurmaRepository turmaRepository,
            com.carlosribeiro.apirestful.repository.InscricaoRepository inscricaoRepository) {
        this.turmaRepository = turmaRepository;
        this.inscricaoRepository = inscricaoRepository;
    }

    public Turma salvar(Turma turma) {
        return turmaRepository.save(turma);
    }

    public void remover(Long id) {
        if (!turmaRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Turma não encontrada");
        }
        try {
            turmaRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new EntidadeEmUsoException("Não é possível remover a turma pois ela possui inscrições.");
        }
    }

    public Turma buscarPorId(Long id) {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Turma não encontrada"));
    }

    public List<Turma> buscarTodos() {
        return turmaRepository.findAll();
    }

    public Page<Turma> listarPaginado(Pageable pageable) {
        return turmaRepository.findAll(pageable);
    }

    public List<com.carlosribeiro.apirestful.model.Aluno> buscarAlunosDaTurma(Long id) {
        List<com.carlosribeiro.apirestful.model.Inscricao> inscricoes = inscricaoRepository.findByTurmaId(id);
        return inscricoes.stream().map(com.carlosribeiro.apirestful.model.Inscricao::getAluno).toList();
    }
}
