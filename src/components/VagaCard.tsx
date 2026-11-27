import type { Vaga } from "../types";

interface VagaCardProps {
  vaga: Vaga;
  salva: boolean;
  candidatada: boolean;
  onSalvar: () => void;
  onCandidatar: () => void;
}

export default function VagaCard({ vaga, salva, candidatada, onSalvar, onCandidatar }: VagaCardProps) {
  return (
    <li className="rounded-lg border border-blue-100 p-3">
      <p className="text-sm font-semibold text-blue-700">{vaga.titulo}</p>
      <p className="text-xs text-slate-500">{vaga.empresa} · {vaga.local} · {vaga.tipo}</p>
      <div className="mt-2 flex items-center gap-2">
        <button onClick={onSalvar} aria-pressed={salva} className={`text-xs rounded-full border px-3 py-1 ${salva ? "bg-blue-100 border-blue-600 text-blue-700" : "border-blue-600 text-blue-600 hover:bg-blue-50"}`}>
          {salva ? "Salva ✓" : "Salvar"}
        </button>
        {candidatada ? (
          <span className="text-xs font-semibold text-blue-700">Candidatura enviada ✓</span>
        ) : (
          <button onClick={onCandidatar} className="text-xs rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
            Candidatar-se
          </button>
        )}
      </div>
    </li>
  );
}
