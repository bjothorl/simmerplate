import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    // Frontend files
    files: [
      "frontend/src/**/*.js",
      "frontend/webpack/clean-dist.js",
      "frontend/webpack/update-index.js",
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        window: true,
        document: true,
        require: true,
        navigator: true,
        __dirname: true,
        process: true,
      },
      parserOptions: {
        requireConfigFile: false,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "error",
      "no-unused-vars": "off",
      "no-case-declarations": "off",
      "no-unreachable": "warn",
      "no-console": ["warn", { allow: ["warn", "error", "debug"] }],
      "no-warning-comments": [
        "warn",
        {
          terms: ["todo", "fix", "fixme"],
          location: "start",
        },
      ],
    },
  },
];
