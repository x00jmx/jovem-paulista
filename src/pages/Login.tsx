import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Button from "../components/Button";
import Field from "../components/Field";
import FormMessage from "../components/FormMessage";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { temErros, validarEmail, validarSenha } from "../lib/validators";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { valores, setErros, campo } = useForm({ email: "", senha: "" });
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Com sessão ativa (salva no localStorage), não há por que ver o login
  if (isAuthenticated) return <Navigate to="/home" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErroGeral("");
    const novos = { email: validarEmail(valores.email), senha: validarSenha(valores.senha) };
    setErros(novos);
    if (temErros(novos)) return;

    setEnviando(true);
    try {
      // Confere e-mail e senha no localStorage (ver services/userService.ts). Ao logar, a rota /home é liberada.
      await login(valores.email, valores.senha);
    } catch (err) {
      setErroGeral(err instanceof Error ? err.message : "Não foi possível entrar. Tente novamente.");
    } finally {
      setEnviando(false); // garante que o botão nunca fique travado
    }
  };

  return (
    <AuthCard title="Entrar" subtitle="Acesse a área restrita da sua rede profissional.">
      <form onSubmit={handleSubmit} noValidate>
        {erroGeral && <FormMessage>{erroGeral}</FormMessage>}
        <Field label="E-mail" type="email" placeholder="voce@empresa.com" {...campo("email")} />
        <Field label="Senha" type="password" placeholder="••••••••" {...campo("senha")} />
        <div className="text-right mb-4 text-sm">
          <Link to="/esqueci-senha" className="text-blue-600 hover:underline font-medium">Esqueci minha senha</Link>
        </div>
        <Button type="submit" disabled={enviando}>{enviando ? "Entrando…" : "Entrar"}</Button>
      </form>
      <p className="text-center text-sm text-slate-600 mt-6">
        Novo por aqui? <Link to="/cadastro" className="text-blue-600 hover:underline font-medium">Cadastre-se</Link>
      </p>
    </AuthCard>
  );
}
