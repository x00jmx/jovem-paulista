import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Button from "../components/Button";
import Field from "../components/Field";
import FormMessage from "../components/FormMessage";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { listaHabilidades, temErros, validarEmail, validarPerfil, validarSenha } from "../lib/validators";

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const { valores, setErros, campo } = useForm({ nome: "", email: "", senha: "", habilidades: "", formacao: "" });
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (isAuthenticated) return <Navigate to="/home" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErroGeral("");
    const novos = { ...validarPerfil(valores), email: validarEmail(valores.email), senha: validarSenha(valores.senha) };
    setErros(novos);
    if (temErros(novos)) return;

    setEnviando(true);
    try {
      // Salva o cadastro completo no localStorage e já inicia a sessão (ver services/userService.ts)
      await register({
        nome: valores.nome,
        email: valores.email,
        senha: valores.senha,
        habilidades: listaHabilidades(valores.habilidades),
        formacao: valores.formacao.trim(),
      });
    } catch (err) {
      setErroGeral(err instanceof Error ? err.message : "Não foi possível concluir o cadastro.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <AuthCard title="Crie seu perfil" subtitle="Conecte-se com profissionais e oportunidades.">
      <form onSubmit={handleSubmit} noValidate>
        {erroGeral && <FormMessage>{erroGeral}</FormMessage>}
        <Field label="Nome completo" placeholder="Maria da Silva" {...campo("nome")} />
        <Field label="E-mail" type="email" placeholder="voce@empresa.com" {...campo("email")} />
        <Field label="Senha" type="password" placeholder="Mínimo de 6 caracteres" {...campo("senha")} />
        <Field label="Habilidades (separe por vírgula)" multiline placeholder="Ex.: Gestão de projetos, React, Vendas B2B" {...campo("habilidades")} />
        <Field label="Formação" multiline placeholder="Ex.: Administração – USP, MBA em Gestão" {...campo("formacao")} />
        <Button type="submit" disabled={enviando}>{enviando ? "Cadastrando…" : "Cadastrar e entrar"}</Button>
      </form>
      <p className="text-center text-sm text-slate-600 mt-6">
        Já tem conta? <Link to="/login" className="text-blue-600 hover:underline font-medium">Entrar</Link>
      </p>
    </AuthCard>
  );
}
