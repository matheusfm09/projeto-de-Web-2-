package br.ueg.trindade.Matheus_projeto_fullstack.Controller;

import br.ueg.trindade.Matheus_projeto_fullstack.*;
import br.ueg.trindade.Matheus_projeto_fullstack.Service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired 
    private  UsuarioService service;


    @GetMapping
    public List<Usuario> listarUsuarios() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return service.criar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {

        return service.atualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}