import { useEffect, useState } from "react";
import api from "../services/api";

interface Permissao {
  id: number;
  nome: string;
  descricao: string;
}

interface PermissaoListProps {
  onEditar: (permissao: Permissao) => void;
  atualizacao: number;
}

export default function PermissaoList({
  onEditar,
  atualizacao
}: PermissaoListProps) {

  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarPermissoes = () => {

    setLoading(true);
    setErro("");

    api
      .get("/permissoes")
      .then((response) => {
        setPermissoes(response.data);
        setLoading(false);
      })
      .catch(() => {
        setErro("Erro ao carregar as permissões.");
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarPermissoes();
  }, [atualizacao]);

  const excluir = async (id: number) => {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta permissão?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await api.delete(`/permissoes/${id}`);

      alert("Permissão excluída com sucesso!");

      carregarPermissoes();

    } catch (error) {

      console.error(error);
      alert("Erro ao excluir permissão.");

    }
  };

  if (loading) {
    return <p>Carregando permissões...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>

      <h2>Lista de Permissões</h2>

      {permissoes.map((permissao) => (

        <div key={permissao.id}>

          <p>
            <strong>Nome:</strong> {permissao.nome}
          </p>

          <p>
            <strong>Descrição:</strong> {permissao.descricao}
          </p>

          <button onClick={() => onEditar(permissao)}>
            Editar
          </button>

          {" "}

          <button onClick={() => excluir(permissao.id)}>
            Excluir
          </button>

          <hr />

        </div>

      ))}

    </div>
  );
}