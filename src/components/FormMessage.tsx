import type { ReactNode } from "react";

interface FormMessageProps {
  tipo?: "erro" | "sucesso";
  children: ReactNode;
}

// Aviso no nível do formulário (ex.: "E-mail ou senha incorretos.")
export default function FormMessage({ tipo = "erro", children }: FormMessageProps) {
  const cores = tipo === "erro" ? "bg-red-50 border-red-200 text-red-700" : "bg-blue-50 border-blue-200 text-blue-800";
  return (
    <p role={tipo === "erro" ? "alert" : "status"} className={`mb-4 rounded-lg border text-sm p-3 ${cores}`}>
      {children}
    </p>
  );
}
