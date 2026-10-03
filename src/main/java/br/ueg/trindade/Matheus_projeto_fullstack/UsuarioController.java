package br.ueg.trindade.Matheus_projeto_fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario buscarUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {

        usuario.setId(id);
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void excluirUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
}