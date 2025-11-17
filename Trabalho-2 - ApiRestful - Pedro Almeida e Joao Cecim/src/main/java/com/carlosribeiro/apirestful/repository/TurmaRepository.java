package com.carlosribeiro.apirestful.repository;

import com.carlosribeiro.apirestful.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    java.util.List<Turma> findByNomeContainingIgnoreCase(String nome);
}
