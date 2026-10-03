package br.ueg.trindade.Matheus_projeto_fullstack.Service;

import br.ueg.trindade.Matheus_projeto_fullstack.*;
import br.ueg.trindade.Matheus_projeto_fullstack.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired 
    private UsuarioRepository repository;

    
    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Usuario criar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuario) {
        usuario.setId(id);
        return repository.save(usuario);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}