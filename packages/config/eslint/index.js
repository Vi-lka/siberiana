/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "@tanstack/query"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/restrict-template-expressions": "off",
    // ограничивает использование {} в качестве типа
    "@typescript-eslint/ban-types": "off",
    // импорт типов должен быть импортирован как import type
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  },
  overrides: [
    {
      files: ["apps/client/**", "docs"],
      plugins: ["react", "react-hooks"],
      extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
      rules: {
        "react/react-in-jsx-scope": "off",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    "**/*.config.js",
    "**/*.config.cjs",
    ".eslintrc.cjs",
    "packages/config/**",
    "**/dist/**",
    "**/.next/**",
  ],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
