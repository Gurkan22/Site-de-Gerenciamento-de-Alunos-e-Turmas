package com.carlosribeiro.apirestful.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"professor_id", "nome"}),
    @UniqueConstraint(columnNames = {"nome"}) 
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

    public Turma(String nome, Professor professor, Integer ano, String periodo) {
        this.nome = nome;
        this.professor = professor;
        this.ano = ano;
        this.periodo = periodo;
    }
}
