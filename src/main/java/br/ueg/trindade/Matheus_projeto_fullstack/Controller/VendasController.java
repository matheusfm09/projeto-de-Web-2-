package br.ueg.trindade.Matheus_projeto_fullstack.Controller;

import br.ueg.trindade.Matheus_projeto_fullstack.*;
import br.ueg.trindade.Matheus_projeto_fullstack.Service.VendasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendasController {


    @Autowired 
    private VendasService service;



    @GetMapping
    public List<Vendas> listarVendas() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendas> buscarVenda(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vendas criarVenda(@RequestBody Vendas venda) {
        return service.criar(venda);
    }

    @PutMapping("/{id}")
    public Vendas atualizarVenda(
            @PathVariable Long id,
            @RequestBody Vendas venda) {

        return service.atualizar(id, venda);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVenda(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}