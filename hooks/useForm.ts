import { useState } from "react";

/**
 * Estado de formulário com erros por campo.
 * `campo("email")` devolve { value, onChange, error } prontos para espalhar em <Field />;
 * digitar em um campo limpa o erro dele.
 */
export function useForm<T extends Record<string, string>>(inicial: T) {
  const [valores, setValores] = useState<T>(inicial);
  const [erros, setErros] = useState<Partial<Record<keyof T, string>>>({});

  const campo = (nome: keyof T) => ({
    value: valores[nome],
    error: erros[nome],
    onChange: (v: string) => {
      setValores((a) => ({ ...a, [nome]: v }));
      setErros((e) => ({ ...e, [nome]: undefined }));
    },
  });

  return { valores, setErros, campo };
}
