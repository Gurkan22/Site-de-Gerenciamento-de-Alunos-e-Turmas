package com.carlosribeiro.apirestful.controller;

import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.model.ResultadoPaginado;
import com.carlosribeiro.apirestful.service.TurmaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/turmas")
@CrossOrigin("http://localhost:5173")

public class TurmaController {
    @GetMapping("/search")
    public ResponseEntity<List<Turma>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(turmaService.buscarPorNome(nome));
    }

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping
    public ResponseEntity<Turma> criar(@RequestBody Turma turma) {
        return ResponseEntity.ok(turmaService.salvar(turma));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        turmaService.remover(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(turmaService.buscarPorId(id));
    }

    @GetMapping("/{id}/alunos")
    public ResponseEntity<List<com.carlosribeiro.apirestful.model.Aluno>> buscarAlunosDaTurma(@PathVariable Long id) {
        return ResponseEntity.ok(turmaService.buscarAlunosDaTurma(id));
    }

    @GetMapping
    public ResponseEntity<List<Turma>> buscarTodos() {
        return ResponseEntity.ok(turmaService.buscarTodos());
    }

    @GetMapping("/paginacao")
    public ResultadoPaginado<Turma> listarPaginado(
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "tamanho", defaultValue = "5") int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Turma> page = turmaService.listarPaginado(pageable);
        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
    }

    @GetMapping("/{id}/alunos/paginacao")
    public ResultadoPaginado<com.carlosribeiro.apirestful.model.Aluno> listarAlunosDaTurmaPaginado(
            @PathVariable Long id,
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "tamanho", defaultValue = "4") int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<com.carlosribeiro.apirestful.model.Aluno> page = turmaService.listarAlunosDaTurmaPaginado(id, pageable);
        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
    }

    @DeleteMapping("/{turmaId}/alunos/{alunoId}")
    public ResponseEntity<Void> removerAlunoDaTurma(@PathVariable Long turmaId, @PathVariable Long alunoId) {
        turmaService.removerAlunoDaTurma(turmaId, alunoId);
        return ResponseEntity.noContent().build();
    }
}
