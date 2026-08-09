# Estratégia de testes (front)

Antes desta suíte, o repositório não tinha nenhuma ferramenta de teste instalada nem um único arquivo
`*.test.*` (ver `docs/product/1_roadmap.md`, seção "🧪 Testes"). Este documento cobre o que existe
hoje, por quê, e como rodar.

## Stack

- **Vitest** — runner, compatível com o mesmo Vite/esbuild que o resto do tooling do projeto já usa,
  bem mais rápido de configurar com Next 16 + React 19 + ESM do que Jest hoje.
- **@testing-library/react** — `renderHook`/`act`/`waitFor` pra testar hooks (`useDebounce`,
  `useTableState`, `useApiMutation`) sem precisar montar um componente inteiro.
- **jsdom** — ambiente DOM em Node, necessário pros hooks que usam `useState`/`useEffect`.
- **@testing-library/jest-dom** — matchers extra (`toBeInTheDocument`, etc.), carregado globalmente
  via `vitest.setup.ts` — ainda não usado por nenhum teste hoje (nenhum teste de componente ainda),
  mas já deixado pronto pro primeiro teste que renderizar algo na tela.

Configuração em `vitest.config.mts` (extensão `.mts`, não `.ts` — evita o aviso do Vite sobre
carregar sintaxe ESM como CommonJS num projeto sem `"type": "module"` no `package.json`). Resolução de
`@/*` via `resolve.tsconfigPaths: true`, nativo do Vite — sem plugin extra.

## O que é (e não é) testado aqui

Foco em **lógica pura e hooks reutilizados por múltiplos módulos** — o que, se quebrar, quebra em
cascata. Não é uma tentativa de cobrir toda tela/formulário do sistema; isso é o papel dos testes E2E
(ainda não implementados, ver roadmap) e de testes de componente pontuais, adicionados quando um
componente específico acumular lógica complexa o suficiente pra justificar.

| Arquivo testado | O que valida | Por quê importa |
|---|---|---|
| `shared/utils/schema.util.ts` | `zIdentifier`, `zString`, `zEnum`, `zDate`, `toFormIdentifier`, `toOptionalFormIdentifier` | Builders reaproveitados pelos 17 `*.schema.ts` do projeto — um bug aqui quebra validação em cascata em todo formulário. Testar os builders substitui um teste por schema (mesmo raciocínio do teste genérico de templates de e-mail no backend). |
| `shared/utils/form.util.ts` | `makeSearchRequest`, `parseSubmit`, `resetForm` | `makeSearchRequest` é o único ponto que monta o `SearchRequest` (contrato com o backend) a partir dos filtros de tela — usado por toda tabela com busca do sistema. |
| `shared/utils/table.util.ts` | `nextSorting` | Lógica de alternância de ordenação usada por toda tabela ordenável. |
| `shared/utils/http.util.ts` | O client HTTP (`api.get/post/put/patch/delete`) | Única porta de saída HTTP do app inteiro (tudo passa por `/api/proxy/*` — ver `docs/ARCHITECTURE.md`). Cobre montagem de querystring, corpo JSON x `FormData`, e extração de mensagem de erro do payload (`message`/`error`/`errors[]`) que todo `useApiMutation` do sistema depende pra mostrar o toast certo. |
| `shared/hooks/useDebounce.ts` | Debounce de valor (usado por `useTableState` pros filtros) | Timing sutil (cancelar o timer anterior a cada mudança) — fácil de regredir silenciosamente. |
| `shared/hooks/useTableState.ts` | Estado de paginação/filtro/ordenação de tabela | Resetar a página ao mudar filtro/ordenação/tamanho é comportamento esperado em toda tabela — testado uma vez aqui, não em cada tela que usa o hook. |
| `shared/utils/mutation.util.ts` | `useApiMutation` (toast de sucesso/erro, `invalidateQueries`, callbacks) | Wrapper usado por praticamente toda mutation do sistema — o "cimento" entre React Query e o feedback visual (toast). |
| `modules/login/login.schema.ts` | `loginSchema` | Um exemplo concreto de schema composto a partir dos builders acima, validando que a composição funciona de ponta a ponta (não um teste por schema — só uma amostra representativa). |

Fora do escopo por ora (candidatos a próxima rodada, não esquecidos):

- **Testes de componente** (formulários, tabelas) — precisam de mais fixture/mock (React Query,
  Next router) por teste; entram quando um componente específico justificar.
- **Testes E2E** (Playwright/Cypress) — ver `docs/product/1_roadmap.md`.

## Como rodar

```bash
pnpm test          # roda a suíte uma vez (usado em CI, quando existir)
pnpm test:watch    # modo watch, re-roda ao salvar
```

Os testes rodam fora do Docker (Node/pnpm locais bastam — não precisam do `docker compose` nem do
backend no ar; são só unitários, sem chamada de rede real).
