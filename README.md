<div align="center">

  # 💼 Jovem Paulista

  **Conectando talentos em início de carreira às suas primeiras oportunidades.**

  [Ver Demo ao Vivo](https://seu-link-aqui.vercel.app) 

  <br />

  [React]
  [TypeScript]
  [Tailwind CSS]
  [Vite]

</div>

<br />

<div align="center">
  <p><sub>Tela principal da área restrita — Feed, conexões e mural de vagas em um só lugar.</sub></p>
</div>

---

### 💡 Por que o Jovem Paulista?

Entrar no mercado de trabalho esbarra em três problemas clássicos: **falta de networking**, **vagas espalhadas em dezenas de sites** e **perfis sem visibilidade** para quem ainda não tem experiência. 

O **Jovem Paulista** resolve isso reunindo perfil acadêmico/técnico, rede de contatos, feed de interações e mural de vagas em uma interface direta, pensada para estudantes e profissionais em início de carreira.

---

### ⚡ O que já funciona

* **Autenticação & Segurança:** Cadastro, login, recuperação de senha com validação e proteção de rotas privadas.
* **Perfil & Persistência:** Edição de habilidades e formação acadêmica salva localmente (`localStorage`).
* **Feed Interativo:** Publicação de posts, curtidas e comentários em tempo real na sessão.
* **Busca Inteligente:** Filtro unificado (pessoas, vagas e posts) que ignora acentos e letras maiúsculas.
* **Vagas & Conexões:** Envio de solicitações de amizade e salvamento de vagas favoritas.

<details>
<summary><b>📸 Ver tela de autenticação (Login)</b></summary>
<br />
<div align="center">
  <img src="docs/login.png" alt="Tela de Login" width="75%" />
</div>
</details>

---

### 🛠️ Rodando o projeto

```bash
# Clone o repositório e entre na pasta
git clone [https://github.com/seu-usuario/jovem-paulista.git](https://github.com/seu-usuario/jovem-paulista.git) && cd jovem-paulista

# Instale as dependências e inicie (requer Node 20+)
npm install && npm run dev

Decisões de Projeto
Front-end First: Fluxos validados na interface antes da construção do back-end.

API Isolada (src/services/api.ts): Camada de dados desacoplada para facilitar a troca do mock por chamadas HTTP reais.

Sessão em Memória: Gerenciada via Context API, encerrando ao recarregar a página (preparado para JWT).

Estrutura
Plaintext
src/
├── components/   # UI reutilizável (Button, Field, AuthCard, Header, Feed...)
├── context/      # AuthContext (controle de sessão)
├── data/         # Dados mockados
├── lib/          # Validadores, busca normalizada e helpers de storage
├── pages/        # Login, Cadastro, Recuperação, Home e Perfil
└── services/     # api.ts (camada de integração)
Conectando a um Back-end
Renomeie .env.example para .env e adicione VITE_API_URL.

Descomente os blocos TODO (integração API) em src/services/api.ts.

Substitua os dados de src/data/mock.ts pelas respostas da API.

🗺️ Próximos Passos
[ ] Algoritmo de recomendação de vagas baseado nas habilidades do perfil

[ ] Filtros de busca por área de atuação e senioridade

[ ] Integração com API REST e banco de dados real

[ ] Sistema de notificações para conexões e vagas

Desenvolvido para a disciplina de Frameworks Front-end (2026)

Vinicius Aragão · João Miguel · Gabriel Rodrigues · Guilherme Alves
