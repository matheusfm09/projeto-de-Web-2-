import VendasForm from "../components/VendasForm";

function VendasPage() {
  return (
    <div>
      <h1>Vendas</h1>

      <VendasForm
        onSalvo={() => window.location.reload()}
        vendaEditando={null}
      />
    </div>
  );
}

export default VendasPage;