import Financeiro from "./Financeiro";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Bem-vindo ao Dashboard, Gabriel 🚀
      </h1>

      {/* 👇 Aqui vão os gráficos do Financeiro */}
      <Financeiro />
    </div>
  );
}
