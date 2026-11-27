import { createContext, useContext, useState, type ReactNode } from "react";
import { KEYS, lerJSON, removerChave, salvarJSON } from "../lib/storage";
import { atualizarUsuario, autenticar, buscarUsuario, cadastrarUsuario } from "../services/userService";
import type { NovoUsuario, PerfilEditavel, Usuario } from "../types";

interface AuthContextValue {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (dados: NovoUsuario) => Promise<void>;
  updateProfile: (dados: PerfilEditavel) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Restaura a sessão a partir do localStorage (guardamos só o e-mail de quem está logado)
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const email = lerJSON<string | null>(KEYS.sessao, null);
    return email ? buscarUsuario(email) : null;
  });

  const iniciarSessao = (u: Usuario) => {
    salvarJSON(KEYS.sessao, u.email);
    setUsuario(u);
  };

  // Os erros (ex.: credenciais inválidas) sobem para a tela, que mostra a mensagem
  const login = async (email: string, senha: string) => iniciarSessao(await autenticar(email, senha));
  const register = async (dados: NovoUsuario) => iniciarSessao(await cadastrarUsuario(dados));

  const updateProfile = async (dados: PerfilEditavel) => {
    if (!usuario) return;
    setUsuario(await atualizarUsuario(usuario.email, dados));
  };

  // Logoff: remove a sessão. O cadastro continua salvo para um próximo login.
  const logout = () => {
    removerChave(KEYS.sessao);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}

/** Para telas e componentes da área restrita, onde sempre existe um usuário logado. */
export function useUsuarioLogado(): Usuario {
  const { usuario } = useAuth();
  if (!usuario) throw new Error("useUsuarioLogado só pode ser usado dentro da área restrita");
  return usuario;
}
