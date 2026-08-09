# Roadmap / próximos passos (front)

Itens em aberto, exclusivos do front (`cliente-facil-next`) — nada aqui está bloqueado por código, são
decisões/trabalho futuro. Organizado por tema pra você validar o que faz sentido pro seu negócio e o
que não vale a pena agora. Nenhum item aqui foi verificado como "impossível" ou "obrigatório" — são
candidatos, não decisões.

Este documento **não repete** nada do `docs/product/3_roadmap.md` do backend (`cliente-facil-java`) —
segurança de infraestrutura, observabilidade de backend, testes de backend, scan de dependências (já
cobre os dois repositórios), CI/CD, etc. continuam só lá. Aqui só entra o que é exclusivo do front:
tooling, arquitetura de componentes, UX, performance de renderização/bundle.

Cada item tem uma nota de por que importa e, quando relevante, o que já foi conferido no código atual
(pra não sugerir algo que já existe).

---

## 🧪 Testes

- [ ] **Nenhuma ferramenta de teste instalada** — sem Jest/Vitest/React Testing Library no
  `package.json`, e nenhum arquivo `*.test.*`/`*.spec.*` existe hoje no repositório. Mais básico que a
  lacuna do backend: lá pelo menos existe uma suíte (47 testes); aqui não existe nenhuma. Pra um app
  com formulários (`react-hook-form` + `zod`), tabelas com filtro/paginação e mutations com efeito
  colateral (toast, invalidação de cache), vale começar pelos hooks/mappers puros (`search-mapper`,
  schemas de validação) antes de partir pra teste de componente.
- [ ] **Testes E2E** (Playwright/Cypress) — hoje a validação de fluxo completo (login → ação →
  resultado) é só manual. Cobriria os fluxos mais críticos primeiro: login/confirmação de e-mail/reset
  de senha, CRUD de usuário, agendamento no calendário.
- [ ] **CI rodando lint/typecheck/testes em cada PR** — não existe `.github/workflows` no repositório
  hoje; sem isso, nem o `tsc --noEmit` roda automaticamente antes de mergear.

## 🔍 Lint & qualidade estática

- [ ] **Lint quebrado** — `eslint.config.mjs` configura a regra `prettier/prettier`, mas o pacote
  `eslint-plugin-prettier` não está instalado (`node_modules/eslint-plugin-prettier` não existe); só
  `prettier-plugin-tailwindcss` está presente, que é um plugin do *Prettier*, não do ESLint — coisas
  diferentes. Resultado: `pnpm lint` falha com "could not find plugin prettier" antes de checar
  qualquer arquivo. Corrigir instalando `eslint-plugin-prettier`+`eslint-config-prettier` (ou removendo
  a regra, se o objetivo for só rodar `prettier --check` separado do ESLint).
- [ ] **Regra `@typescript-eslint/no-explicit-any` desligada** — hoje só 4 usos de `any` no código,
  então o custo de reativar a regra (com exceções pontuais via `// eslint-disable-line`) é baixo
  agora; tende a crescer sem controle se ficar desligada conforme o projeto cresce.
- [ ] **`package.json` ainda com `"name": "next-template"`** — sobra do scaffold inicial, nunca
  renomeado pro nome real do produto.

## 📐 Consistência de arquitetura & documentação

- [ ] **`docs/ARCHITECTURE.md` descreve uma estrutura que já não é a real.** O documento descreve
  `src/features/<modulo>/api/{modulo.api.ts, modulo.query.ts, modulo.mutation.ts}` e uma camada
  `src/lib/api/{client.ts, errors.ts, types.ts, search-request.ts, search-mapper.ts}`. O código real
  hoje é `src/modules/<modulo>/{modulo.api.ts, modulo.hooks.ts, ...}` (query e mutation juntos num
  `.hooks.ts` só, não separados) e a infraestrutura HTTP mora em `src/shared/utils/{http.util.ts,
  error.util.ts, mutation.util.ts}` + `src/shared/types/http.type.ts` — não existe pasta `src/lib/`
  nem `src/features/` no repositório. O documento provavelmente reflete o desenho original antes do
  projeto evoluir; vale atualizar pra bater com a realidade (documentação desatualizada é pior que
  nenhuma — quem ler primeiro vai procurar arquivos que não existem).
- [ ] **Dependência do `axios` sem uso real.** `package.json` lista `axios`, e
  `src/shared/utils/http.util.ts` cria uma instância (`export const http = axios.create(...)`) — mas
  o client HTTP de verdade usado em todo o app (`export const api`) é implementado com `fetch()` nativo
  logo abaixo, no mesmo arquivo. A instância `http` do axios não é importada em nenhum outro lugar
  (confirmado por busca no repositório) — é peso morto no bundle/lockfile. Bate com o que o próprio
  `ARCHITECTURE.md` já diz ("Sem Axios obrigatório"), só que na prática o pacote nem deveria estar
  instalado. Remover `axios` e o export `http` não usado.
- [ ] **Duplicação de design system**: componentes legados `CoreButton.tsx`, `CoreModal.tsx`,
  `CardComponent.tsx` (`src/shared/components/`) coexistem com uso direto dos primitivos shadcn
  (`@/components/ui/button`, `@/components/ui/card`) — hoje 27 arquivos importam `Button` do shadcn
  diretamente contra 6 que ainda usam `CoreButton`. As duas convenções se comportam de forma
  ligeiramente diferente (props, defaults), o que deixa a UI inconsistente tela a tela e obriga quem
  mexe num componente novo a adivinhar qual dos dois é "o certo" hoje. Vale decidir um caminho (migrar
  tudo pra shadcn direto e aposentar os `Core*`, ou formalizar os `Core*` como a camada oficial de
  wrapper) e documentar a escolha.

## ♿ Acessibilidade & tratamento de erro

- [ ] **Acessibilidade (a11y)** — não foi auditado; sem checagem de contraste, navegação por teclado,
  leitor de tela. Ponto a favor: os primitivos shadcn usados no projeto (`radix-ui`) já vêm com boa
  parte do trabalho de ARIA/foco feito por padrão — a auditoria tende a achar menos problema do que um
  app construído do zero sem essa base, mas ainda vale confirmar (principalmente em componentes
  customizados como o calendário e as tabelas).
- [ ] **`error.tsx` existe mas é mínimo** — `src/app/error.tsx` já captura erro de renderização numa
  rota (bom, é mais do que muitos projetos têm), só que não loga o erro em lugar nenhum (nem
  `console.error`, nem um serviço de rastreamento), usa `<button>` cru em vez de `CoreButton`/`Button`
  do shadcn (foge do design system do resto do app) e não existe um `global-error.tsx` na raiz — um
  erro que acontece no próprio `layout.tsx` (fora do que `error.tsx` cobre) hoje quebra a aplicação
  sem nenhuma tela de fallback.
- [ ] **Sem `loading.tsx`/estados de carregamento por rota** — hoje cada tela decide sozinha como
  mostrar "carregando" (ou não mostra nada) enquanto a query inicial resolve; o mecanismo nativo do
  Next (`loading.tsx` + Suspense automático por rota) não é usado em nenhuma tela hoje.
- [ ] **i18n** — todo o texto é português fixo, direto no componente (sem biblioteca de tradução). Só
  importa se algum dia o produto for atender um mercado não-lusófono.

## ⚡ Performance

- [ ] **`next/image` nunca é usado** — zero ocorrências no código (`grep` confirma). Toda imagem
  (quando existir — hoje o app usa majoritariamente ícones `lucide-react`, não fotos) entraria como
  `<img>` cru, perdendo otimização automática de tamanho/formato/lazy-loading que o Next já oferece de
  graça. Vale menos hoje (pouca imagem real no app) e mais assim que a tela de produtos/catálogo
  (`Order`/`Product`, ver roadmap de regras de negócio) trouxer fotos de produto.
- [ ] **Bundle size nunca foi medido** — sem `@next/bundle-analyzer` (ou equivalente) configurado;
  não há visibilidade de qual dependência pesa mais no bundle final (candidato óbvio pra revisar
  depois de remover o `axios` morto: `@fullcalendar/*` é notoriamente pesado, vale confirmar se está
  sendo code-splitted pra rotas que não usam calendário).
- [ ] **`QueryClient` sem nenhuma configuração** — `QueryProvider.tsx` cria `new QueryClient()` sem
  nenhum `defaultOptions` (`staleTime: 0` e retry padrão do React Query — 3 tentativas com backoff —
  valem pra toda query do app hoje). Pra um proxy same-origin que já tem timeout/erro tratado pelo
  backend, vale revisar se esse retry automático faz sentido pra todas as queries (uma falha de
  permissão, por exemplo, não deveria ser re-tentada 3x) e se `staleTime` 0 não está causando refetch
  desnecessário em navegação entre telas.
- [ ] **React Query Devtools ausente** — `@tanstack/react-query-devtools` não está instalado; facilita
  bastante depurar cache/refetch durante o desenvolvimento, custo zero em produção (fica de fora do
  bundle final, é só dev).

## 📈 Observabilidade do front

- [ ] **Rastreamento de erro do front** (Sentry-for-React ou equivalente) — distinto do item de Sentry
  do backend (esse rastreia exceção Java); hoje um erro de JavaScript no navegador do usuário não é
  reportado a lugar nenhum além do console do próprio navegador — nem o `error.tsx` atual loga.
- [ ] **Core Web Vitals** — Next expõe `useReportWebVitals`/`next/web-vitals` pronto pra uso; hoje
  nada é coletado (LCP, INP, CLS ficam invisíveis em produção).

## 🧩 Produto — funcionalidades exclusivas do front

- [ ] **Persistência de preferência do usuário** (tamanho de página de tabela, filtros usados,
  tema já é feito via `next-themes`) — hoje nenhuma tela usa `localStorage` (confirmado por busca no
  repositório); toda filtragem/paginação reseta ao navegar pra fora e voltar.
- [ ] **Atualização otimista nas mutations** — `mutation.util.ts` (`useApiMutation`) hoje invalida a
  query após sucesso (espera resposta do servidor pra atualizar a tela); atualização otimista
  (atualizar a UI antes da resposta confirmar, desfazer se falhar) deixaria ações como marcar
  notificação como lida ou mudar status de um evento mais responsivas.
- [ ] **Command palette (Cmd+K)** — padrão comum em ERPs/dashboards densos em navegação (o app já tem
  bastante tela em `src/modules/`); Radix/shadcn já tem o primitivo (`cmdk`) pronto pra integrar.
- [ ] **PWA / suporte offline** — sem `manifest.json` nem service worker hoje. Só relevante se o uso
  em campo (ex: profissional em atendimento externo, sem sinal) fizer parte do produto.

---

## 🔗 Ver também

- `docs/product/3_roadmap.md` (repositório `cliente-facil-java`) — roadmap de backend/infraestrutura,
  não duplicado aqui.
- `docs/ARCHITECTURE.md` — arquitetura de camadas do front (ver ressalva de desatualização acima).
