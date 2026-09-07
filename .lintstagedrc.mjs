import path from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix --no-warn-ignored ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

export default {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{json,css,md}": ["prettier --write"],
};
