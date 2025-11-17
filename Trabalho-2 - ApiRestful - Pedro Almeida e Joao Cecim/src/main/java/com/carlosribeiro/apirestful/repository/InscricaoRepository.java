package com.carlosribeiro.apirestful.repository;

import com.carlosribeiro.apirestful.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    java.util.List<Inscricao> findByTurmaId(Long turmaId);

    java.util.List<Inscricao> findByAlunoId(Long alunoId);
}
