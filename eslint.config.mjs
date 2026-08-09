import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// Registra o plugin "prettier" em si (a regra "prettier/prettier" abaixo referenciava um plugin
// que nunca tinha sido instalado/registrado — eslint falhava com "could not find plugin prettier"
// antes de checar qualquer arquivo). O preset `recommended` já traz junto o eslint-config-prettier,
// desligando as regras de estilo do ESLint que colidiriam com o Prettier.
import prettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      "prettier/prettier": [
        "warn",
        {
          printWidth: 120,
        },
      ],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
