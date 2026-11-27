import { useState, type FormEvent } from "react";
import { useForm } from "../hooks/useForm";
import { listaHabilidades, temErros, validarPerfil } from "../lib/validators";
import type { PerfilEditavel, Usuario } from "../types";
import Field from "./Field";
import FormMessage from "./FormMessage";

interface ProfileEditFormProps {
  usuario: Usuario;
  onSalvar: (dados: PerfilEditavel) => Promise<void>;
  onFechar: () => void; // chamado após salvar com sucesso e ao cancelar
}

export default function ProfileEditForm({ usuario, onSalvar, onFechar }: ProfileEditFormProps) {
  const { valores, setErros, campo } = useForm({
    nome: usuario.nome,
    habilidades: usuario.habilidades.join(", "),
    formacao: usuario.formacao,
  });
  const [salvando, setSalvando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErroGeral("");
    const novos = validarPerfil(valores);
    setErros(novos);
    if (temErros(novos)) return;
    setSalvando(true);
    try {
      await onSalvar({
        nome: valores.nome.trim(),
        habilidades: listaHabilidades(valores.habilidades),
        formacao: valores.formacao.trim(),
      });
      onFechar();
    } catch (err) {
      setErroGeral(err instanceof Error ? err.message : "Não foi possível salvar o perfil.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {erroGeral && <FormMessage>{erroGeral}</FormMessage>}
      <Field label="Nome completo" {...campo("nome")} />
      <Field label="Habilidades (separe por vírgula)" multiline {...campo("habilidades")} />
      <Field label="Formação" multiline {...campo("formacao")} />
      <div className="flex gap-3">
        <button type="submit" disabled={salvando} className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2">
          {salvando ? "Salvando…" : "Salvar alterações"}
        </button>
        <button type="button" onClick={onFechar} className="flex-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2">
          Cancelar
        </button>
      </div>
    </form>
  );
}