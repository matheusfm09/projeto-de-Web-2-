package br.ueg.trindade.Matheus_projeto_fullstack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendasController {

    @Autowired
    private VendasRepository repository;

    @GetMapping
    public List<Vendas> listarVendas() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Vendas buscarVenda(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Vendas criarVenda(@RequestBody Vendas venda) {
        return repository.save(venda);
    }

    @PutMapping("/{id}")
    public Vendas atualizarVenda(@PathVariable Long id, @RequestBody Vendas venda) {
        venda.setId(id);
        return repository.save(venda);
    }

    @DeleteMapping("/{id}")
    public void excluirVenda(@PathVariable Long id) {
        repository.deleteById(id);
    }
}