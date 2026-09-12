<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Git: never commit, branch, or push on your own

NEVER run `git commit`, `git checkout -b` / `git branch` (creating a new branch), or `git push` unless the user explicitly asks for that specific action in that message. This applies even after finishing a task the user did ask for — implementing, fixing, or "padronizando" something does NOT imply permission to commit or branch it. Leave changes staged/unstaged in the working tree and tell the user they're ready; let them decide when and how to commit.

# Comentários no código: só para regras complexas

Não comente código que já se explica sozinho (nome de variável/função claro, lógica trivial, wrapper fino em cima de uma lib). Um comentário só se justifica quando explica algo que o código em si não deixa óbvio — e que, sem ele, alguém poderia "corrigir" de volta pro jeito errado. Exemplos que justificam comentário:

- Uma regra de negócio não óbvia (ex: por que um usuário sem determinada permissão nunca vê o filtro de outro usuário, mesmo que tente forçar via request).
- Um workaround pra um bug/limitação de infraestrutura (ex: por que uma query usa `coalesce` em vez de `IS NULL OR` pra contornar uma limitação do driver do Postgres em inferir tipo de parâmetro).
- Uma decisão de design que parece inconsistente à primeira vista (ex: por que esse método não pagina como todos os outros do mesmo repositório).

Não comente: o que uma função faz (o nome já diz), reformulação em português do que a linha de código já mostra, ou observações genéricas de "boa prática". Ao gerar código novo, escreva primeiro sem comentário nenhum e só adicione um se, relendo, a regra continuar não óbvia.

Mesmo quando justificado, o comentário deve ser curto: o fato + a consequência, em 1-3 linhas. Não narre o mecanismo interno por trás (ex: como uma lib resolve algo por debaixo dos panos) — isso é algo pra pesquisar se alguém ficar curioso, não algo que o código precisa preservar pra sempre. Se a explicação está passando de 3-4 linhas, é sinal de cortar pro essencial.
