package com.carlosribeiro.apirestful.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = { "professor_id", "nome", "disciplina_id" })
})

public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer ano;
    private String periodo;
    private String nome;

    @ManyToOne(optional = false)
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;

    public Turma(String nome, Professor professor, Disciplina disciplina, Integer ano, String periodo) {
        this.nome = nome;
        this.professor = professor;
        this.disciplina = disciplina;
        this.ano = ano;
        this.periodo = periodo;
    }
}
