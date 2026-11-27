import { useId } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
}

const base = "w-full rounded-lg border bg-white px-3 py-2 text-slate-800 outline-none focus:ring-2";
const normal = "border-blue-200 focus:border-blue-600 focus:ring-blue-200";
const invalido = "border-red-500 focus:border-red-600 focus:ring-red-200";

// Campo controlado: o estado fica na página. Se houver `error`, mostra a mensagem abaixo do campo.
export default function Field({ label, value, onChange, error, type = "text", placeholder, multiline }: FieldProps) {
  const id = useId();
  const erroId = `${id}-erro`;
  const comum = {
    value,
    placeholder,
    className: `${base} ${error ? invalido : normal}`,
    "aria-invalid": !!error,
    "aria-describedby": error ? erroId : undefined,
  };
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      {multiline ? (
        <textarea rows={3} {...comum} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} {...comum} onChange={(e) => onChange(e.target.value)} />
      )}
      {error && (
        <span id={erroId} role="alert" className="mt-1 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
