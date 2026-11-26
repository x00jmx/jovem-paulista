import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProfileEditForm from "../components/ProfileEditForm";
import { useAuth, useUsuarioLogado } from "../context/AuthContext";

// Tela separada de edição de perfil (rota /perfil, dentro da área restrita)
export default function EditProfile() {
  const usuario = useUsuarioLogado();
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-xl mx-auto p-4">
        <Link to="/home" className="text-sm text-blue-600 hover:underline font-medium">← Voltar ao início</Link>
        <div className="mt-3 bg-white rounded-xl border border-blue-100 shadow-sm p-6">
          <h1 className="text-xl font-bold text-slate-900">Editar perfil</h1>
          <p className="text-sm text-slate-500 mb-6">Atualize como você aparece para a sua rede.</p>
          {/* Ao salvar (ou cancelar), volta para a Home */}
          <ProfileEditForm usuario={usuario} onSalvar={updateProfile} onFechar={() => navigate("/home")} />
        </div>
      </main>
    </div>
  );
}