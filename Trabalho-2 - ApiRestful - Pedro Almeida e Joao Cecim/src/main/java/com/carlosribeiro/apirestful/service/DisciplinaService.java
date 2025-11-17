package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Disciplina;
import com.carlosribeiro.apirestful.repository.DisciplinaRepository;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class DisciplinaService {
    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public Disciplina salvar(Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    public void remover(Long id) {
        if (!disciplinaRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Disciplina não encontrada");
        }
        try {
            disciplinaRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Não é possível remover a disciplina pois ela está em uso.");
        }
    }

    public Disciplina buscarPorId(Long id) {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Disciplina não encontrada"));
    }

    public List<Disciplina> buscarTodos() {
        return disciplinaRepository.findAll();
    }

    public Page<Disciplina> listarPaginado(Pageable pageable) {
        return disciplinaRepository.findAll(pageable);
    }
}
