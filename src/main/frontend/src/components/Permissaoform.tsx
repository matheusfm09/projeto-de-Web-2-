import { useEffect, useState } from "react";
import api from "../services/api";

interface Permissao {
  id: number;
  nome: string;
  descricao: string;
}

interface PermissaoFormProps {
  onSalvo: () => void;
  permissaoEditando: Permissao | null;
  onCancelar: () => void;
}

function PermissaoForm({
  onSalvo,
  permissaoEditando,
  onCancelar
}: PermissaoFormProps) {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (permissaoEditando) {
      setNome(permissaoEditando.nome);
      setDescricao(permissaoEditando.descricao);
    } else {
      setNome("");
      setDescricao("");
    }
  }, [permissaoEditando]);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (permissaoEditando) {
        await api.put(`/permissoes/${permissaoEditando.id}`, {
          nome,
          descricao
        });

        alert("Permissão atualizada com sucesso!");
      } else {
        await api.post("/permissoes", {
          nome,
          descricao
        });

        alert("Permissão cadastrada com sucesso!");
      }

      setNome("");
      setDescricao("");

      onSalvo();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar permissão.");
    }
  };

  return (
    <div>
      <h2>
        {permissaoEditando
          ? "Editar Permissão"
          : "Cadastrar Permissão"}
      </h2>

      <form onSubmit={salvar}>

        <div>
          <label>Nome:</label>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Descrição:</label>

          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          {permissaoEditando ? "Atualizar" : "Cadastrar"}
        </button>

        {permissaoEditando && (
          <>
            {" "}
            <button type="button" onClick={onCancelar}>
              Cancelar
            </button>
          </>
        )}

      </form>
    </div>
  );
}

export default PermissaoForm;