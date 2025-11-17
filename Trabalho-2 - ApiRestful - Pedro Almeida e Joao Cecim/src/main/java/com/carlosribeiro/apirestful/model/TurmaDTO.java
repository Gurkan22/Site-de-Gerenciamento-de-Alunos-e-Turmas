package com.carlosribeiro.apirestful.model;

import lombok.Data;

@Data
public class TurmaDTO {
    private Long id;
    private String nome;
    private Integer ano;
    private String periodo;
    private Professor professor;
}
