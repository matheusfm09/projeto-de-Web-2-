```tsx
import { useState } from "react";

import UsuarioForm from "./components/UsuarioForm";
import UsuarioList from "./components/UsuarioList";

import PermissaoForm from "./components/PermissaoForm";
import PermissaoList from "./components/PermissaoList";

import VendasList from "./components/VendasList";

import { Usuario } from "./types/Usuario";

interface Permissao {
  id: number;
  nome: string;
  descricao: string;
}

function App() {

  const [usuarioEditando, setUsuarioEditando] =
    useState<Usuario | null>(null);

  const [atualizacaoUsuario, setAtualizacaoUsuario] =
    useState(0);

  const [permissaoEditando, setPermissaoEditando] =
    useState<Permissao | null>(null);

  const [atualizacaoPermissao, setAtualizacaoPermissao] =
    useState(0);

  const atualizarUsuarios = () => {
    setAtualizacaoUsuario((valor) => valor + 1);
    setUsuarioEditando(null);
  };

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
  };

  const cancelarEdicaoUsuario = () => {
    setUsuarioEditando(null);
  };

  const atualizarPermissoes = () => {
    setAtualizacaoPermissao((valor) => valor + 1);
    setPermissaoEditando(null);
  };

  const editarPermissao = (permissao: Permissao) => {
    setPermissaoEditando(permissao);
  };

  const cancelarEdicaoPermissao = () => {
    setPermissaoEditando(null);
  };

  return (
    <div>

      <h1>Sistema de Usuários</h1>

      <UsuarioForm
        onSalvo={atualizarUsuarios}
        usuarioEditando={usuarioEditando}
        onCancelar={cancelarEdicaoUsuario}
      />

      <hr />

      <UsuarioList
        onEditar={editarUsuario}
        atualizacao={atualizacaoUsuario}
      />

      <hr />

      <PermissaoForm
        onSalvo={atualizarPermissoes}
        permissaoEditando={permissaoEditando}
        onCancelar={cancelarEdicaoPermissao}
      />

      <hr />

      <PermissaoList
        onEditar={editarPermissao}
        atualizacao={atualizacaoPermissao}
      />

      <hr />

      <h2>Vendas</h2>

      <VendasList />

    </div>
  );
}

export default App;
```
