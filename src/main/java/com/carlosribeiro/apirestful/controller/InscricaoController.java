package com.carlosribeiro.apirestful.controller;

import com.carlosribeiro.apirestful.model.Inscricao;
import com.carlosribeiro.apirestful.service.InscricaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {
    private final InscricaoService inscricaoService;

    public InscricaoController(InscricaoService inscricaoService) {
        this.inscricaoService = inscricaoService;
    }

    @PostMapping
    public ResponseEntity<Inscricao> criar(@RequestBody Inscricao inscricao) {
        return ResponseEntity.ok(inscricaoService.salvar(inscricao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        inscricaoService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
