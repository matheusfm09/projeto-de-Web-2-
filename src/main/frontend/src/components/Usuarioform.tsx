import { useEffect, useState } from "react";
import axios from "axios";

interface Usuario {
  id: number;
  nome: string;
  username: string;
  email: string;
}

interface UsuarioFormProps {
  onSalvo: () => void;
  usuarioEditando: Usuario | null;
  onCancelar: () => void;
}

function UsuarioForm({
  onSalvo,
  usuarioEditando,
  onCancelar
}: UsuarioFormProps) {

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (usuarioEditando) {
      setNome(usuarioEditando.nome);
      setUsername(usuarioEditando.username);
      setEmail(usuarioEditando.email);
    } else {
      setNome("");
      setUsername("");
      setEmail("");
    }
  }, [usuarioEditando]);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      if (usuarioEditando) {

        await axios.put(
          `http://localhost:8080/usuarios/${usuarioEditando.id}`,
          {
            nome: nome,
            username: username,
            email: email
          }
        );

        alert("Usuário atualizado com sucesso!");

      } else {

        await axios.post(
          "http://localhost:8080/usuarios",
          {
            nome: nome,
            username: username,
            email: email
          }
        );

        alert("Usuário cadastrado com sucesso!");
      }

      setNome("");
      setUsername("");
      setEmail("");

      onSalvo();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar usuário.");
    }
  };

  return (
    <div>

      <h2>
        {usuarioEditando
          ? "Editar Usuário"
          : "Cadastrar Usuário"}
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
          <label>Username:</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email:</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          {usuarioEditando ? "Atualizar" : "Cadastrar"}
        </button>

        {usuarioEditando && (
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

export default UsuarioForm;