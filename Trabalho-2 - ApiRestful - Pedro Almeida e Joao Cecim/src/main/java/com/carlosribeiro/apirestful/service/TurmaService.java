package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Aluno;
import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.repository.TurmaRepository;
import com.carlosribeiro.apirestful.exception.EntidadeEmUsoException;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;

import java.util.List;
import java.util.Comparator;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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

    public List<Turma> buscarPorNome(String nome) {
        return turmaRepository.findByNomeContainingIgnoreCase(nome);
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

    public List<com.carlosribeiro.apirestful.model.Aluno> buscarAlunosDaTurma(Long turmaId) {
        List<com.carlosribeiro.apirestful.model.Inscricao> inscricoes = inscricaoRepository.findByTurmaId(turmaId);
        // ordenar por id da inscrição decrescente (mais recente primeiro)
        inscricoes.sort(Comparator.comparing(com.carlosribeiro.apirestful.model.Inscricao::getId).reversed());
        return inscricoes.stream().map(com.carlosribeiro.apirestful.model.Inscricao::getAluno).toList();
    }

    public Page<Aluno> listarAlunosDaTurmaPaginado(Long turmaId, Pageable pageable) {
        // Busca alunos da turma via InscricaoRepository
        List<com.carlosribeiro.apirestful.model.Inscricao> inscricoes = inscricaoRepository.findByTurmaId(turmaId);
        // ordenar por id de inscrição decrescente antes de paginar
        inscricoes.sort(Comparator.comparing(com.carlosribeiro.apirestful.model.Inscricao::getId).reversed());
        List<Aluno> alunos = inscricoes.stream().map(com.carlosribeiro.apirestful.model.Inscricao::getAluno).toList();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), alunos.size());
        List<Aluno> pagedAlunos = alunos.subList(start, end);
        return new PageImpl<>(pagedAlunos, pageable, alunos.size());
    }

    public void removerAlunoDaTurma(Long turmaId, Long alunoId) {
        // Busca inscrição pelo turmaId e alunoId
        java.util.List<com.carlosribeiro.apirestful.model.Inscricao> inscricoes = inscricaoRepository
                .findByTurmaId(turmaId);
        com.carlosribeiro.apirestful.model.Inscricao inscricao = inscricoes.stream()
                .filter(i -> i.getAluno().getId().equals(alunoId))
                .findFirst()
                .orElseThrow(() -> new com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException(
                        "Inscrição não encontrada para aluno/turma"));
        inscricaoRepository.deleteById(inscricao.getId());
    }

}
