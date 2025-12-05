package com.carlosribeiro.apirestful.auth.util;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioLogin {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String senha;
}
