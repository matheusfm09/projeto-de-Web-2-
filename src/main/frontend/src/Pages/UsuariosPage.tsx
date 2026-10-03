import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

function UsuariosPage() {
  return (
    <div>
      <h1>Usuários</h1>

      <UsuarioForm
        onSalvo={() => window.location.reload()}
        usuarioEditando={null}
      />

      <UsuarioList />
    </div>
  );
}

export default UsuariosPage;