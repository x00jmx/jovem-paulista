export interface Usuario {
  nome: string;
  email: string;
  habilidades: string[];
  formacao: string;
}

/** Usuário + senha, do jeito que fica guardado no localStorage (apenas simulação). */
export type NovoUsuario = Usuario & { senha: string };

/** Campos que o usuário pode alterar na edição de perfil. */
export type PerfilEditavel = Pick<Usuario, "nome" | "habilidades" | "formacao">;

export interface Comentario {
  id: string;
  autor: string;
  texto: string;
}

export interface Post {
  id: string;
  autor: string;
  cargo: string;
  texto: string;
  curtidas: number; // curtidas "de base" (dados mockados)
  curtidoPor: string[]; // e-mails de quem curtiu neste navegador
  comentarios: Comentario[];
}

export interface Vaga {
  id: string;
  titulo: string;
  empresa: string;
  local: string;
  tipo: string;
}

export interface Pessoa {
  id: string;
  nome: string;
  cargo: string;
}

/** Atividade do usuário logado (guardada por e-mail no localStorage). */
export interface Atividade {
  conexoes: string[];
  vagasSalvas: string[];
  candidaturas: string[];
}
