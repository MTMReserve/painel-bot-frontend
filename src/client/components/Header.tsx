//============================
// src/components/Header.tsx
//============================

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Painel de Monitoramento</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={() => alert("Logout fictício")}
      >
        Logout
      </button>
    </header>
  );
}
