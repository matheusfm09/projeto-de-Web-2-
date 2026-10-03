import { useEffect, useState } from "react";
import api from "../services/api";
import { Vendas } from "../types/Vendas";
import VendasForm from "./VendasForm";

function VendasList() {

    const [vendas, setVendas] = useState<Vendas[]>([]);
    const [vendaSelecionada, setVendaSelecionada] =
        useState<Vendas | null>(null);

    const carregarVendas = async () => {
        try {
            const resposta = await api.get<Vendas[]>("/vendas");
            setVendas(resposta.data);
        } catch (error) {
            console.error("Erro ao carregar vendas:", error);
        }
    };

    useEffect(() => {
        carregarVendas();
    }, []);

    const excluir = async (id: number) => {

        if (!confirm("Deseja realmente excluir esta venda?")) {
            return;
        }

        try {
            await api.delete(`/vendas/${id}`);
            carregarVendas();
        } catch (error) {
            console.error("Erro ao excluir venda:", error);
            alert("Erro ao excluir venda.");
        }
    };

    const editar = (venda: Vendas) => {
        setVendaSelecionada(venda);
    };

    return (
        <div>

            <VendasForm
                vendaSelecionada={vendaSelecionada}
                onSalvo={() => {
                    setVendaSelecionada(null);
                    carregarVendas();
                }}
            />

            <hr />

            <h2>Lista de Vendas</h2>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {vendas.map((venda) => (

                        <tr key={venda.id}>

                            <td>{venda.id}</td>
                            <td>{venda.produto}</td>
                            <td>{venda.quantidade}</td>

                            <td>
                                R$ {venda.valor.toFixed(2)}
                            </td>

                            <td>

                                <button
                                    onClick={() => editar(venda)}
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => excluir(venda.id!)}
                                >
                                    Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default VendasList;