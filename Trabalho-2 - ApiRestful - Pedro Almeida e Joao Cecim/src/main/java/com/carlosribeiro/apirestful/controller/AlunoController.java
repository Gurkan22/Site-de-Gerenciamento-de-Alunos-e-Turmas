package com.carlosribeiro.apirestful.controller;

import com.carlosribeiro.apirestful.model.Aluno;
import com.carlosribeiro.apirestful.model.ResultadoPaginado;
import com.carlosribeiro.apirestful.service.AlunoService;
import com.carlosribeiro.apirestful.service.InscricaoService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/alunos")
@CrossOrigin("http://localhost:5173")

public class AlunoController {
    private final AlunoService alunoService;
    private final InscricaoService inscricaoService;

    public AlunoController(AlunoService alunoService, InscricaoService inscricaoService) {
        this.alunoService = alunoService;
        this.inscricaoService = inscricaoService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Aluno> criar(@Valid @RequestBody Aluno aluno) {
        return ResponseEntity.ok(alunoService.salvar(aluno));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno aluno) {
        return ResponseEntity.ok(alunoService.atualizar(id, aluno));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        alunoService.remover(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(alunoService.buscarPorId(id));
    }

    @GetMapping("/{id}/turmas")
    public ResponseEntity<java.util.List<com.carlosribeiro.apirestful.model.Turma>> buscarTurmasDoAluno(
            @PathVariable Long id) {
        // busca turmas pelas inscrições do aluno
        java.util.List<com.carlosribeiro.apirestful.model.Inscricao> inscricoes = inscricaoService.buscarPorAlunoId(id);
        java.util.List<com.carlosribeiro.apirestful.model.Turma> turmas = inscricoes.stream()
                .map(com.carlosribeiro.apirestful.model.Inscricao::getTurma).toList();
        return ResponseEntity.ok(turmas);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Aluno>> buscarTodos() {
        return ResponseEntity.ok(alunoService.buscarTodos());
    }

    @GetMapping("/paginacao")
    public ResultadoPaginado<Aluno> listarPaginado(
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "tamanho", defaultValue = "5") int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Aluno> page = alunoService.listarPaginado(pageable);
        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
    }
}
