import { Link } from "react-router-dom";
import type { Usuario } from "../types";

interface ProfileCardProps {
  usuario: Usuario;
  conexoes: number;
  vagasSalvas: number;
  candidaturas: number;
}

export default function ProfileCard({ usuario, conexoes, vagasSalvas, candidaturas }: ProfileCardProps) {
  const estatisticas = [
    ["Conexões", conexoes],
    ["Vagas salvas", vagasSalvas],
    ["Candidaturas", candidaturas],
  ] as const;

  return (
    <aside className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden self-start">
      <div className="h-16 bg-linear-to-r from-blue-600 to-blue-400" />
      <div className="px-4 -mt-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-2xl font-bold text-blue-700">
          {usuario.nome.charAt(0).toUpperCase()}
        </div>
        <p className="font-bold mt-2 text-slate-900">{usuario.nome}</p>
        <p className="text-sm text-slate-500">{usuario.formacao}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {usuario.habilidades.map((h) => (
            <span key={h} className="rounded-full bg-blue-50 text-blue-700 text-xs px-2 py-0.5">{h}</span>
          ))}
        </div>
        <dl className="mt-4 space-y-1 text-sm text-slate-600">
          {estatisticas.map(([rotulo, valor]) => (
            <div key={rotulo} className="flex justify-between">
              <dt>{rotulo}</dt>
              <dd className="font-bold text-blue-700">{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="p-4">
        {/* A edição acontece em tela própria (/perfil) */}
        <Link to="/perfil" className="block w-full text-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold py-1.5">
          Editar perfil
        </Link>
      </div>
    </aside>
  );
}