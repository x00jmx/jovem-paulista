import { useState } from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import { useUsuarioLogado } from "../context/AuthContext";
import { ATIVIDADE_VAZIA, CONEXOES_BASE } from "../data/mock";
import { usePersistentState } from "../hooks/usePersistentState";
import { KEYS } from "../lib/storage";
import type { Atividade } from "../types";

const alternar = (lista: string[], id: string) => (lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]);

export default function Home() {
  const usuario = useUsuarioLogado();
  const [busca, setBusca] = useState("");
  // Conexões, vagas salvas e candidaturas ficam salvas por usuário (localStorage)
  const [atividade, setAtividade] = usePersistentState<Atividade>(KEYS.atividade(usuario.email), ATIVIDADE_VAZIA);

  const alternarConexao = (id: string) => setAtividade((a) => ({ ...a, conexoes: alternar(a.conexoes, id) }));
  const alternarVaga = (id: string) => setAtividade((a) => ({ ...a, vagasSalvas: alternar(a.vagasSalvas, id) }));
  const candidatar = (id: string) =>
    setAtividade((a) => (a.candidaturas.includes(id) ? a : { ...a, candidaturas: [...a.candidaturas, id] }));

  return (
    <div className="min-h-screen">
      <Header busca={busca} onBuscar={setBusca} />
      <main className="max-w-6xl mx-auto grid gap-4 p-4 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_280px]">
        <ProfileCard
          usuario={usuario}
          conexoes={CONEXOES_BASE + atividade.conexoes.length}
          vagasSalvas={atividade.vagasSalvas.length}
          candidaturas={atividade.candidaturas.length}
        />
        <Feed busca={busca} />
        <Sidebar busca={busca} atividade={atividade} onAlternarConexao={alternarConexao} onAlternarVaga={alternarVaga} onCandidatar={candidatar} />
      </main>
    </div>
  );
}