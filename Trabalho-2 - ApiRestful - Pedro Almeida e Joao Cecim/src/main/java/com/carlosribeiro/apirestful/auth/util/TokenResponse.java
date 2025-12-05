package com.carlosribeiro.apirestful.auth.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenResponse {
    private String token;
    private Long id;
    private String nome;
    private String role;
}
