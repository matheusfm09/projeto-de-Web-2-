package br.ueg.trindade.Matheus_projeto_fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissoes")
@CrossOrigin(origins = "*")
public class PermissaoController {

    @Autowired
    private PermissaoRepository permissaoRepository;

    @GetMapping
    public List<Permissao> listarPermissoes() {
        return permissaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Permissao buscarPermissao(@PathVariable Long id) {
        return permissaoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Permissao criarPermissao(@RequestBody Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    @PutMapping("/{id}")
    public Permissao atualizarPermissao(
            @PathVariable Long id,
            @RequestBody Permissao permissao) {

        permissao.setId(id);
        return permissaoRepository.save(permissao);
    }

    @DeleteMapping("/{id}")
    public void excluirPermissao(@PathVariable Long id) {
        permissaoRepository.deleteById(id);
    }
}
