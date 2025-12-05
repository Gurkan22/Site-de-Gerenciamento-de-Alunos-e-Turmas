package com.carlosribeiro.apirestful.service;

import com.carlosribeiro.apirestful.model.Inscricao;
import com.carlosribeiro.apirestful.repository.InscricaoRepository;
import com.carlosribeiro.apirestful.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;

@Service
public class InscricaoService {
    private final InscricaoRepository inscricaoRepository;

    public InscricaoService(InscricaoRepository inscricaoRepository) {
        this.inscricaoRepository = inscricaoRepository;
    }

    public Inscricao salvar(Inscricao inscricao) {
        return inscricaoRepository.save(inscricao);
    }

    public java.util.List<Inscricao> buscarPorAlunoId(Long alunoId) {
        return inscricaoRepository.findByAlunoId(alunoId);
    }

    public void remover(Long id) {
        if (!inscricaoRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Inscrição não encontrada");
        }
        inscricaoRepository.deleteById(id);
    }
}
