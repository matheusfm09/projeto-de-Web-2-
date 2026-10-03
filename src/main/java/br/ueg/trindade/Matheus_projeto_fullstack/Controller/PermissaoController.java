package br.ueg.trindade.Matheus_projeto_fullstack.Controller;

import br.ueg.trindade.Matheus_projeto_fullstack.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissoes")
@CrossOrigin(origins = "*")
public class PermissaoController {

    private final PermissaoService service;

    public PermissaoController(PermissaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Permissao> listarPermissoes() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Permissao> buscarPermissao(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Permissao criarPermissao(@RequestBody Permissao permissao) {
        return service.criar(permissao);
    }

    @PutMapping("/{id}")
    public Permissao atualizarPermissao(
            @PathVariable Long id,
            @RequestBody Permissao permissao) {

        return service.atualizar(id, permissao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPermissao(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}