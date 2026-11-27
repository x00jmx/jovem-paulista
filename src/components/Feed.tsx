import { useState } from "react";
import { useUsuarioLogado } from "../context/AuthContext";
import { postsIniciais } from "../data/mock";
import { usePersistentState } from "../hooks/usePersistentState";
import { combinaBusca } from "../lib/busca";
import { KEYS, novoId } from "../lib/storage";
import type { Post } from "../types";
import PostCard from "./PostCard";

interface FeedProps {
  busca: string; // termo digitado no header
}

export default function Feed({ busca }: FeedProps) {
  const { nome, email } = useUsuarioLogado();
  // PONTO DE INTEGRAÇÃO (futuro): o feed é lido/gravado no localStorage; com backend, carregue via GET e publique via POST.
  const [posts, setPosts] = usePersistentState<Post[]>(KEYS.posts, postsIniciais);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");

  const publicar = () => {
    if (!texto.trim()) return setErro("Escreva algo antes de publicar.");
    const novo: Post = { id: novoId(), autor: nome, cargo: "Membro da rede", texto: texto.trim(), curtidas: 0, curtidoPor: [], comentarios: [] };
    setPosts((atual) => [novo, ...atual]);
    setTexto("");
    setErro("");
  };

  // Curtir é um liga/desliga por usuário (guardamos o e-mail de quem curtiu)
  const curtir = (id: string) =>
    setPosts((atual) =>
      atual.map((p) =>
        p.id !== id ? p : { ...p, curtidoPor: p.curtidoPor.includes(email) ? p.curtidoPor.filter((e) => e !== email) : [...p.curtidoPor, email] },
      ),
    );

  const comentar = (id: string, textoComentario: string) =>
    setPosts((atual) =>
      atual.map((p) => (p.id !== id ? p : { ...p, comentarios: [...p.comentarios, { id: novoId(), autor: nome, texto: textoComentario }] })),
    );

  const visiveis = posts.filter((p) => combinaBusca(busca, p.autor, p.cargo, p.texto));

  return (
    <section className="space-y-4">
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4">
        <textarea
          rows={2}
          maxLength={500}
          value={texto}
          onChange={(e) => { setTexto(e.target.value); setErro(""); }}
          placeholder="Compartilhe uma ideia ou oportunidade com sua rede…"
          aria-label="Nova publicação"
          aria-invalid={!!erro}
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${erro ? "border-red-500 focus:ring-red-200" : "border-blue-200 focus:border-blue-600 focus:ring-blue-200"}`}
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <p role="alert" className="text-xs text-red-600">{erro}</p>
          <button onClick={publicar} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-1.5">
            Publicar
          </button>
        </div>
      </div>

      {visiveis.map((p) => (
        <PostCard key={p.id} post={p} emailAtual={email} onCurtir={curtir} onComentar={comentar} />
      ))}
      {visiveis.length === 0 && (
        <p className="rounded-xl bg-white border border-blue-100 p-4 text-sm text-slate-500">
          Nenhuma publicação encontrada para “{busca}”.
        </p>
      )}
    </section>
  );
}
