import { useState, type FormEvent } from "react";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  emailAtual: string;
  onCurtir: (id: string) => void;
  onComentar: (id: string, texto: string) => void;
}

export default function PostCard({ post, emailAtual, onCurtir, onComentar }: PostCardProps) {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const curtiu = post.curtidoPor.includes(emailAtual);
  const total = post.curtidas + post.curtidoPor.length;

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return setErro("Escreva um comentário antes de enviar.");
    onComentar(post.id, texto.trim());
    setTexto("");
    setErro("");
  };

  const acao = "rounded-full px-3 py-1 text-sm font-medium hover:bg-blue-50";

  return (
    <article className="bg-white rounded-xl border border-blue-100 shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
          {post.autor.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-900 leading-tight">{post.autor}</p>
          <p className="text-xs text-slate-500">{post.cargo}</p>
        </div>
      </div>
      <p className="mt-3 text-slate-700 text-sm">{post.texto}</p>
      <p className="mt-3 text-xs text-slate-500">👍 {total} · {post.comentarios.length} comentários</p>

      <div className="mt-2 flex gap-2 border-t border-blue-50 pt-2">
        <button onClick={() => onCurtir(post.id)} aria-pressed={curtiu} className={`${acao} ${curtiu ? "bg-blue-100 text-blue-700" : "text-slate-600"}`}>
          {curtiu ? "Curtido" : "Curtir"}
        </button>
        <button onClick={() => setAberto(!aberto)} aria-expanded={aberto} className={`${acao} text-slate-600`}>
          Comentar
        </button>
      </div>

      {aberto && (
        <div className="mt-3 space-y-2">
          {post.comentarios.map((c) => (
            <p key={c.id} className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">{c.autor}: </span>{c.texto}
            </p>
          ))}
          <form onSubmit={enviar} className="flex gap-2">
            <input
              value={texto}
              onChange={(e) => { setTexto(e.target.value); setErro(""); }}
              placeholder="Escreva um comentário…"
              aria-label="Comentário"
              aria-invalid={!!erro}
              className={`flex-1 rounded-full border px-3 py-1.5 text-sm outline-none focus:ring-2 ${erro ? "border-red-500 focus:ring-red-200" : "border-blue-200 focus:border-blue-600 focus:ring-blue-200"}`}
            />
            <button type="submit" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4">Enviar</button>
          </form>
          {erro && <p role="alert" className="text-xs text-red-600">{erro}</p>}
        </div>
      )}
    </article>
  );
}
