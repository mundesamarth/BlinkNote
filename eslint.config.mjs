// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// ESLint (flat-config) expects an array here
export default [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
];
