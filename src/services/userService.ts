import { KEYS, lerJSON, salvarJSON } from "../lib/storage";
import type { NovoUsuario, PerfilEditavel, Usuario } from "../types";

/**
 * "Banco de dados" do projeto: os usuários ficam no localStorage, sem nenhuma chamada de API.
 *
 * PONTO DE INTEGRAÇÃO (futuro): as funções são async de propósito. Para ligar um backend real,
 * troque o corpo de cada uma por uma chamada HTTP mantendo a mesma assinatura — as telas não mudam.
 *
 * ATENÇÃO: a senha é guardada em texto puro só porque isto é uma simulação. Nunca faça isso em produção.
 */

const normalizarEmail = (email: string) => email.trim().toLowerCase();
const listar = () => lerJSON<NovoUsuario[]>(KEYS.usuarios, []);

// Nunca devolve a senha para o restante da aplicação.
const semSenha = (u: NovoUsuario): Usuario => ({
  nome: u.nome,
  email: u.email,
  habilidades: u.habilidades,
  formacao: u.formacao,
});

/** Usado para restaurar a sessão ao recarregar a página. */
export function buscarUsuario(email: string): Usuario | null {
  const u = listar().find((x) => x.email === normalizarEmail(email));
  return u ? semSenha(u) : null;
}

export async function cadastrarUsuario(dados: NovoUsuario): Promise<Usuario> {
  const usuarios = listar();
  const email = normalizarEmail(dados.email);
  if (usuarios.some((u) => u.email === email)) throw new Error("Este e-mail já está cadastrado.");
  const novo: NovoUsuario = { ...dados, email, nome: dados.nome.trim() };
  salvarJSON(KEYS.usuarios, [...usuarios, novo]);
  return semSenha(novo);
}

export async function autenticar(email: string, senha: string): Promise<Usuario> {
  const u = listar().find((x) => x.email === normalizarEmail(email) && x.senha === senha);
  // Mensagem genérica de propósito: não revela se foi o e-mail ou a senha que falhou.
  if (!u) throw new Error("E-mail ou senha incorretos.");
  return semSenha(u);
}

export async function atualizarUsuario(email: string, dados: PerfilEditavel): Promise<Usuario> {
  const usuarios = listar();
  const i = usuarios.findIndex((u) => u.email === normalizarEmail(email));
  if (i < 0) throw new Error("Usuário não encontrado.");
  usuarios[i] = { ...usuarios[i], ...dados };
  salvarJSON(KEYS.usuarios, usuarios);
  return semSenha(usuarios[i]);
}

/** Simulação: nenhum e-mail é enviado e a resposta não revela se o e-mail existe. */
export async function recuperarSenha(email: string): Promise<void> {
  void email;
}
