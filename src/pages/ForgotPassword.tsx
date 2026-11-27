import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Button from "../components/Button";
import Field from "../components/Field";
import FormMessage from "../components/FormMessage";
import { useForm } from "../hooks/useForm";
import { validarEmail } from "../lib/validators";
import { recuperarSenha } from "../services/userService";

export default function ForgotPassword() {
  const { valores, setErros, campo } = useForm({ email: "" });
  const [erroGeral, setErroGeral] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviado(false);
    setErroGeral("");
    const erroEmail = validarEmail(valores.email);
    setErros({ email: erroEmail });
    if (erroEmail) return;

    setEnviando(true);
    try {
      await recuperarSenha(valores.email); // simulação: nenhum e-mail é enviado de verdade
      setEnviado(true);
    } catch {
      setErroGeral("Não foi possível processar o pedido. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <AuthCard title="Recuperar acesso" subtitle="Informe seu e-mail e enviaremos um link de redefinição.">
      <form onSubmit={handleSubmit} noValidate>
        {erroGeral && <FormMessage>{erroGeral}</FormMessage>}
        <Field label="E-mail" type="email" placeholder="voce@empresa.com" {...campo("email")} />
        <Button type="submit" disabled={enviando}>{enviando ? "Enviando…" : "Enviar link"}</Button>
      </form>
      {enviado && (
        <div className="mt-4">
          <FormMessage tipo="sucesso">Se o e-mail estiver cadastrado, você receberá as instruções em instantes.</FormMessage>
        </div>
      )}
      <p className="text-center text-sm mt-6">
        <Link to="/login" className="text-blue-600 hover:underline font-medium">← Voltar ao login</Link>
      </p>
    </AuthCard>
  );
}
