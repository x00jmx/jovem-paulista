/** Chaves do localStorage — todas com o prefixo do sistema. */
export const KEYS = {
  usuarios: "jovempaulista:usuarios",
  sessao: "jovempaulista:sessao",
  posts: "jovempaulista:posts",
  atividade: (email: string) => `jovempaulista:atividade:${email}`,
};

// O localStorage pode estar indisponível (modo privado) ou cheio: nunca deixe isso quebrar a tela.
export function lerJSON<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
}

export function salvarJSON(chave: string, valor: unknown): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* ignora falha de armazenamento */
  }
}

export function removerChave(chave: string): void {
  try {
    localStorage.removeItem(chave);
  } catch {
    /* ignora falha de armazenamento */
  }
}

export const novoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
