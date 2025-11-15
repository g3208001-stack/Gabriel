import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Financeiro() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("Alimentação");
  const [tipo, setTipo] = useState("Despesa");

  const adicionarTransacao = (e) => {
    e.preventDefault();
    if (!descricao || !valor) return;
    const nova = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      categoria,
      tipo,
    };
    setTransacoes([...transacoes, nova]);
    setDescricao("");
    setValor("");
  };

  const totalReceitas = transacoes
    .filter((t) => t.tipo === "Receita")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
    .filter((t) => t.tipo === "Despesa")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  // Gráfico de pizza por categoria
  const categorias = [...new Set(transacoes.map((t) => t.categoria))];
  const dadosPizza = categorias.map((cat) => ({
    name: cat,
    value: transacoes
      .filter((t) => t.categoria === cat)
      .reduce((acc, t) => acc + t.valor, 0),
  }));

  // Gráfico de barras por tipo
  const dadosBarra = [
    { name: "Receitas", value: totalReceitas },
    { name: "Despesas", value: totalDespesas },
  ];

  const cores = ["#4CAF50", "#F44336", "#2196F3", "#FFC107", "#9C27B0"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Controle Financeiro do Gabriel 💰
      </h1>

      <form
        onSubmit={adicionarTransacao}
        className="bg-white p-4 rounded-2xl shadow max-w-xl mx-auto mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Alimentação</option>
            <option>Transporte</option>
            <option>Lazer</option>
            <option>Saúde</option>
            <option>Outros</option>
          </select>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Despesa</option>
            <option>Receita</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Adicionar
          </button>
        </div>
      </form>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-center">Por Categoria</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dadosPizza}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dadosPizza.map((_, i) => (
                  <Cell key={i} fill={cores[i % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-center">Receitas x Despesas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dadosBarra}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-center mt-6">
        <h3 className="text-xl font-bold">Saldo Atual: R$ {saldo.toFixed(2)}</h3>
      </div>
    </div>
  );
}
