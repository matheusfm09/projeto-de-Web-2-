package br.ueg.trindade.Matheus_projeto_fullstack.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.Matheus_projeto_fullstack.Permissao;
import br.ueg.trindade.Matheus_projeto_fullstack.PermissaoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository repository;

    public List<Permissao> listarTodos() {
        return repository.findAll();
    }

    public Optional<Permissao> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Permissao criar(Permissao permissao) {
        return repository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao permissao) {
        permissao.setId(id);
        return repository.save(permissao);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}