import type { Atividade, Pessoa, Post, Vaga } from "../types";

// Dados de exemplo (mock) — este projeto é somente front-end.
export const CONEXOES_BASE = 24;

export const ATIVIDADE_VAZIA: Atividade = { conexoes: [], vagasSalvas: [], candidaturas: [] };

export const postsIniciais: Post[] = [
  {
    id: "p1", autor: "Helena Duarte", cargo: "Diretora de Operações · LogiNova",
    texto: "Estamos abrindo 12 vagas para analistas de dados em Recife. Quem quer fazer parte do time? 🚀",
    curtidas: 148, curtidoPor: [],
    comentarios: [{ id: "c1", autor: "Rafael Moreira", texto: "Ótima notícia! Já compartilhei com meu time." }],
  },
  {
    id: "p2", autor: "Rafael Moreira", cargo: "CEO · Startup Alvorada",
    texto: "Aprendizado do trimestre: contratar devagar e desligar rápido não é regra, mas cultura clara reduz os dois.",
    curtidas: 96, curtidoPor: [], comentarios: [],
  },
  {
    id: "p3", autor: "Beatriz Lemos", cargo: "Gerente de Marketing · Orbita",
    texto: "Nosso workshop sobre marca empregadora tem inscrições abertas até sexta. Vagas limitadas!",
    curtidas: 63, curtidoPor: [], comentarios: [],
  },
];

export const pessoas: Pessoa[] = [
  { id: "u1", nome: "Carlos Menezes", cargo: "Engenheiro de Software" },
  { id: "u2", nome: "Paula Andrade", cargo: "Head de Vendas" },
  { id: "u3", nome: "Iara Souza", cargo: "Analista de RH" },
  { id: "u4", nome: "Tiago Barros", cargo: "Designer de Produto" },
  { id: "u5", nome: "Marina Lopes", cargo: "Analista de Dados" },
];

export const vagas: Vaga[] = [
  { id: "v1", titulo: "Product Manager – Fintech", empresa: "Nubra", local: "Recife, PE", tipo: "Híbrido" },
  { id: "v2", titulo: "Desenvolvedor(a) Front-end Sênior", empresa: "Orbita", local: "Remoto", tipo: "Remoto" },
  { id: "v3", titulo: "Analista de Negócios Pleno", empresa: "LogiNova", local: "Paulista, PE", tipo: "Presencial" },
  { id: "v4", titulo: "Analista de Dados Júnior", empresa: "LogiNova", local: "Recife, PE", tipo: "Híbrido" },
  { id: "v5", titulo: "Designer de Produto", empresa: "Startup Alvorada", local: "Remoto", tipo: "Remoto" },
  { id: "v6", titulo: "Estágio em Marketing Digital", empresa: "Orbita", local: "Olinda, PE", tipo: "Presencial" },
];
