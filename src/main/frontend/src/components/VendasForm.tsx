import { useState } from "react";
import api from "../services/api";
import { Vendas } from "../types/Vendas";

interface VendasFormProps {
    vendaSelecionada?: Vendas | null;
    onSalvo: () => void;
}

function VendasForm({ vendaSelecionada, onSalvo }: VendasFormProps) {

    const [produto, setProduto] = useState(
        vendaSelecionada?.produto || ""
    );

    const [quantidade, setQuantidade] = useState(
        vendaSelecionada?.quantidade || 0
    );

    const [valor, setValor] = useState(
        vendaSelecionada?.valor || 0
    );

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        const venda = {
            produto,
            quantidade,
            valor
        };

        try {
            if (vendaSelecionada?.id) {
                await api.put(`/vendas/${vendaSelecionada.id}`, venda);
            } else {
                await api.post("/vendas", venda);
            }

            setProduto("");
            setQuantidade(0);
            setValor(0);

            onSalvo();

        } catch (error) {
            console.error("Erro ao salvar venda:", error);
            alert("Erro ao salvar venda.");
        }
    };

    return (
        <form onSubmit={salvar}>

            <h2>
                {vendaSelecionada
                    ? "Editar Venda"
                    : "Cadastrar Venda"}
            </h2>

            <div>
                <label>Produto:</label>

                <input
                    type="text"
                    value={produto}
                    onChange={(e) => setProduto(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Quantidade:</label>

                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) =>
                        setQuantidade(Number(e.target.value))
                    }
                    required
                />
            </div>

            <div>
                <label>Valor:</label>

                <input
                    type="number"
                    step="0.01"
                    value={valor}
                    onChange={(e) =>
                        setValor(Number(e.target.value))
                    }
                    required
                />
            </div>

            <button type="submit">
                {vendaSelecionada ? "Atualizar" : "Cadastrar"}
            </button>

        </form>
    );
}

export default VendasForm;