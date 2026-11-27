// Remove acentos e ignora maiúsculas: "analise" encontra "Análise".
const normalizar = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** true se o termo aparece em algum dos campos. Termo vazio combina com tudo. */
export function combinaBusca(termo: string, ...campos: string[]): boolean {
  const t = normalizar(termo.trim());
  return !t || campos.some((c) => normalizar(c).includes(t));
}
