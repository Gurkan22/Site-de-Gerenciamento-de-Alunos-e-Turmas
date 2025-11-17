package com.carlosribeiro.apirestful.controller;

import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.service.TurmaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/turmas")
public class TurmaController {
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
}
