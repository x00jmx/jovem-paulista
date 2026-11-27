const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const SENHA_MIN = 6;

export type Erros<K extends string> = Partial<Record<K, string>>;

export const temErros = (erros: object) => Object.values(erros).some(Boolean);

// Cada validador devolve a mensagem de erro, ou undefined quando o valor é válido.
export function validarEmail(v: string): string | undefined {
  if (!v.trim()) return "Informe seu e-mail.";
  if (!EMAIL_RE.test(v.trim())) return "Digite um e-mail válido (ex.: nome@empresa.com).";
}

export function validarSenha(v: string): string | undefined {
  if (!v) return "Informe sua senha.";
  if (v.length < SENHA_MIN) return `A senha deve ter pelo menos ${SENHA_MIN} caracteres.`;
}

export function validarNome(v: string): string | undefined {
  const t = v.trim();
  if (!t) return "Informe seu nome completo.";
  if (t.split(/\s+/).length < 2) return "Digite nome e sobrenome.";
}

/** "React, Vendas B2B" -> ["React", "Vendas B2B"] */
export const listaHabilidades = (v: string) =>
  v.split(",").map((s) => s.trim()).filter(Boolean);

/** Regras compartilhadas entre o cadastro e a edição de perfil. */
export function validarPerfil(v: { nome: string; habilidades: string; formacao: string }) {
  return {
    nome: validarNome(v.nome),
    habilidades: listaHabilidades(v.habilidades).length
      ? undefined
      : "Informe ao menos uma habilidade (separe por vírgula).",
    formacao: v.formacao.trim() ? undefined : "Informe sua formação.",
  };
}
