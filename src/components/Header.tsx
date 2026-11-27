import { Link, useNavigate } from "react-router-dom";
import { useAuth, useUsuarioLogado } from "../context/AuthContext";
import Logo from "./Logo";

interface HeaderProps {
  busca?: string;
  // Sem onBuscar, a busca não é exibida (ex.: tela de edição de perfil)
  onBuscar?: (valor: string) => void;
}

export default function Header({ busca = "", onBuscar }: HeaderProps) {
  const { logout } = useAuth();
  const { nome } = useUsuarioLogado();
  const navigate = useNavigate();

  const sair = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        <Link to="/home" aria-label="Ir para o início"><Logo /></Link>
        {/* Busca controlada: o texto filtra pessoas, vagas e publicações na Home */}
        {onBuscar && (
          <input
            type="search"
            aria-label="Buscar pessoas, vagas e publicações"
            value={busca}
            onChange={(e) => onBuscar(e.target.value)}
            className="order-last basis-full sm:order-none sm:basis-auto sm:flex-1 sm:max-w-xs rounded-full bg-blue-50 px-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Buscar pessoas, vagas, publicações"
          />
        )}
        <div className="ml-auto flex items-center gap-3">
          {/* Nome do usuário no canto superior direito (leva à edição de perfil) */}
          <Link to="/perfil" title="Editar perfil" className="flex items-center gap-2 rounded-full hover:bg-blue-50 pr-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {nome.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-slate-800 max-w-36 truncate">{nome}</span>
          </Link>
          <button onClick={sair} className="text-sm rounded-full border border-blue-600 text-blue-600 px-3 py-1 hover:bg-blue-50">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}