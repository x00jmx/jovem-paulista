import { useEffect, useState } from "react";
import { lerJSON, salvarJSON } from "../lib/storage";

/**
 * Igual ao useState, mas lê o valor inicial do localStorage e grava a cada mudança.
 * A chave é lida uma vez (na montagem): use-a com chaves estáveis.
 */
export function usePersistentState<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => lerJSON(chave, inicial));
  useEffect(() => {
    salvarJSON(chave, valor);
  }, [chave, valor]);
  return [valor, setValor] as const;
}
