import PermissaoForm from "../components/PermissaoForm";
import PermissaoList from "../components/PermissaoList";

function PermissoesPage() {
  return (
    <div>
      <h1>Permissões</h1>

      <PermissaoForm
        onSalvo={() => window.location.reload()}
        permissaoEditando={null}
      />

      <PermissaoList />
    </div>
  );
}

export default PermissoesPage;