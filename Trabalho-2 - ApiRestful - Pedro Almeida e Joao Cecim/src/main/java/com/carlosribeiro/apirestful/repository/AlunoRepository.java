package com.carlosribeiro.apirestful.repository;

import com.carlosribeiro.apirestful.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
