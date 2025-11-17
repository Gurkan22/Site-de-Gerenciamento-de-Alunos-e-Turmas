package com.carlosribeiro.apirestful.repository;

import com.carlosribeiro.apirestful.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscricaoRepositoryTurmaAluno extends JpaRepository<Inscricao, Long> {
    org.springframework.data.domain.Page<Inscricao> findByTurmaId(Long turmaId,
            org.springframework.data.domain.Pageable pageable);
}
