package com.carlosribeiro.apirestful.auth.controller;

import com.carlosribeiro.apirestful.auth.model.Usuario;
import com.carlosribeiro.apirestful.auth.repository.UsuarioRepository;
import com.carlosribeiro.apirestful.auth.service.JwtService;
import com.carlosribeiro.apirestful.auth.util.TokenResponse;
import com.carlosribeiro.apirestful.auth.util.UsuarioLogin;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/autenticacao")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody UsuarioLogin usuarioLogin,
            HttpServletResponse response) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usuarioLogin.getEmail(), usuarioLogin.getSenha()));

        Usuario usuario = usuarioRepository.findByEmail(usuarioLogin.getEmail()).orElseThrow();

        String accessToken = jwtService.generateAccessToken(usuario);

        return new ResponseEntity<>(new TokenResponse(
                accessToken, usuario.getId(), usuario.getNome(), usuario.getRole().name()), HttpStatus.OK);
    }

    // endpoint público para registro: cria sempre com role USER
    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> criarUsuarioPublico(@Valid @RequestBody Usuario usuario) {
        usuario.setRole(com.carlosribeiro.apirestful.auth.util.Role.USER);
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        Usuario salvo = usuarioRepository.save(usuario);
        return new ResponseEntity<>(salvo, HttpStatus.CREATED);
    }

    // endpoint para ADMIN criar usuários (pode definir role ADMIN ou USER)
    @PostMapping(path = "/usuarios/admin")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Usuario> criarUsuarioPorAdmin(@Valid @RequestBody Usuario usuario) {
        if (usuario.getRole() == null) {
            usuario.setRole(com.carlosribeiro.apirestful.auth.util.Role.USER);
        }
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        Usuario salvo = usuarioRepository.save(usuario);
        return new ResponseEntity<>(salvo, HttpStatus.CREATED);
    }
}
