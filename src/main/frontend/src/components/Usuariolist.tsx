import { useEffect, useState } from "react";
import api from "../services/api";
import { Usuario } from "../types/Usuario";

interface UsuarioListProps {
  onEditar: (usuario: Usuario) => void;
  atualizacao: number;
}

export default function UsuarioList({
  onEditar,
  atualizacao
}: UsuarioListProps) {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarUsuarios = () => {

    setLoading(true);
    setErro("");

    api
      .get("/usuarios")
      .then((response) => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(() => {
        setErro("Erro ao carregar os usuários.");
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarUsuarios();
  }, [atualizacao]);

  const excluir = async (id: number) => {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await api.delete(`/usuarios/${id}`);

      alert("Usuário excluído com sucesso!");

      carregarUsuarios();

    } catch (error) {

      console.error(error);
      alert("Erro ao excluir usuário.");

    }
  };

  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>

      <h2>Lista de Usuários</h2>

      {usuarios.map((usuario) => (

        <div key={usuario.id}>

          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>

          <p>
            <strong>Username:</strong> {usuario.username}
          </p>

          <p>
            <strong>Email:</strong> {usuario.email}
          </p>

          <button onClick={() => onEditar(usuario)}>
            Editar
          </button>

          {" "}

          <button onClick={() => excluir(usuario.id)}>
            Excluir
          </button>

          <hr />

        </div>

      ))}

    </div>
  );
}