import { useState } from "react";
import { pessoas, vagas } from "../data/mock";
import { combinaBusca } from "../lib/busca";
import type { Atividade } from "../types";
import VagaCard from "./VagaCard";

interface SidebarProps {
  busca: string; // termo digitado no header
  atividade: Atividade;
  onAlternarConexao: (id: string) => void;
  onAlternarVaga: (id: string) => void;
  onCandidatar: (id: string) => void;
}

const card = "bg-white rounded-xl border border-blue-100 shadow-sm p-4";

export default function Sidebar({ busca, atividade, onAlternarConexao, onAlternarVaga, onCandidatar }: SidebarProps) {
  const [soSalvas, setSoSalvas] = useState(false);

  const pessoasVisiveis = pessoas.filter((p) => combinaBusca(busca, p.nome, p.cargo));
  const vagasVisiveis = vagas.filter(
    (v) => combinaBusca(busca, v.titulo, v.empresa, v.local, v.tipo) && (!soSalvas || atividade.vagasSalvas.includes(v.id)),
  );

  return (
    <aside className="space-y-4 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
      <div className={card}>
        <h2 className="font-bold text-slate-900 mb-3">Pessoas que você talvez conheça</h2>
        {pessoasVisiveis.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-2 mb-3 last:mb-0">
            <div>
              <p className="text-sm font-semibold text-slate-800">{p.nome}</p>
              <p className="text-xs text-slate-500">{p.cargo}</p>
            </div>
            <button onClick={() => onAlternarConexao(p.id)} className="text-xs rounded-full border border-blue-600 text-blue-600 px-3 py-1 hover:bg-blue-50 whitespace-nowrap">
              {atividade.conexoes.includes(p.id) ? "Enviado ✓" : "+ Conectar"}
            </button>
          </div>
        ))}
        {pessoasVisiveis.length === 0 && <p className="text-sm text-slate-500">Nenhuma pessoa encontrada.</p>}
      </div>

      <div className={card}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="font-bold text-slate-900">Vagas em destaque</h2>
          <label className="flex items-center gap-1 text-xs text-slate-600">
            <input type="checkbox" checked={soSalvas} onChange={(e) => setSoSalvas(e.target.checked)} />
            Só salvas
          </label>
        </div>
        <ul className="space-y-2">
          {vagasVisiveis.map((v) => (
            <VagaCard
              key={v.id}
              vaga={v}
              salva={atividade.vagasSalvas.includes(v.id)}
              candidatada={atividade.candidaturas.includes(v.id)}
              onSalvar={() => onAlternarVaga(v.id)}
              onCandidatar={() => onCandidatar(v.id)}
            />
          ))}
        </ul>
        {vagasVisiveis.length === 0 && <p className="text-sm text-slate-500">Nenhuma vaga encontrada.</p>}
      </div>
    </aside>
  );
}
