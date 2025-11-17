package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.repository.TurmaRepository;
import com.carlosribeiro.apirestful.exception.EntidadeEmUsoException;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class TurmaService {
    private final TurmaRepository turmaRepository;

    public TurmaService(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
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
}
