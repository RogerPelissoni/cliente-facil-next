<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Git: never commit, branch, or push on your own

NEVER run `git commit`, `git checkout -b` / `git branch` (creating a new branch), or `git push` unless the user explicitly asks for that specific action in that message. This applies even after finishing a task the user did ask for — implementing, fixing, or "padronizando" something does NOT imply permission to commit or branch it. Leave changes staged/unstaged in the working tree and tell the user they're ready; let them decide when and how to commit.
