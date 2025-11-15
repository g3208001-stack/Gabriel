// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Usuários de teste
  const users = [
    { usuario: "gabriel", senha: "123" },
    { usuario: "teste", senha: "321" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Remove espaços e ignora caps lock
    const usuarioTrimmed = usuario.trim().toLowerCase();
    const senhaTrimmed = senha.trim();

    const userFound = users.find(
      (u) => u.usuario.toLowerCase() === usuarioTrimmed && u.senha === senhaTrimmed
    );

    if (userFound) {
      navigate("/dashboard"); // vai pro Dashboard
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}


