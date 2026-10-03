package br.ueg.trindade.Matheus_projeto_fullstack.Service;

import br.ueg.trindade.Matheus_projeto_fullstack.*;
import br.ueg.trindade.Matheus_projeto_fullstack.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendasService {


    @Autowired
    private Vendasrepository repository;


    public List<Vendas> listarTodos() {
        return repository.findAll();
    }

    public Optional<Vendas> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Vendas criar(Vendas venda) {

        if (venda.getQuantidade() <= 0) {
            throw new IllegalArgumentException(
                    "A quantidade deve ser maior que zero."
            );
        }

        if (venda.getValor() <= 0) {
            throw new IllegalArgumentException(
                    "O valor deve ser maior que zero."
            );
        }

        return repository.save(venda);
    }

    public Vendas atualizar(Long id, Vendas venda) {

        if (venda.getQuantidade() <= 0) {
            throw new IllegalArgumentException(
                    "A quantidade deve ser maior que zero."
            );
        }

        if (venda.getValor() <= 0) {
            throw new IllegalArgumentException(
                    "O valor deve ser maior que zero."
            );
        }

        venda.setId(id);

        return repository.save(venda);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}