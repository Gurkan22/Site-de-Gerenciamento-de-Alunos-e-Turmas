package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Professor;
import com.carlosribeiro.apirestful.repository.ProfessorRepository;
import com.carlosribeiro.apirestful.exception.EntidadeEmUsoException;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public Professor salvar(Professor professor) {
        return professorRepository.save(professor);
    }

    public Professor atualizar(Long id, Professor professor) {
        Professor existente = professorRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Professor não encontrado"));
        existente.setNome(professor.getNome());
        existente.setEmail(professor.getEmail());
        return professorRepository.save(existente);
    }

    public void remover(Long id) {
        if (!professorRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Professor não encontrado");
        }
        try {
            professorRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new EntidadeEmUsoException("Não é possível remover o professor pois ele está vinculado a uma turma.");
        }
    }

    public Professor buscarPorId(Long id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Professor não encontrado"));
    }

    public List<Professor> buscarTodos() {
        return professorRepository.findAll();
    }
}
