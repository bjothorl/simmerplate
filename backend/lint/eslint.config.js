import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // Backend files
    files: ["backend/src/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off", // Allow console for server-side logging
      "no-process-env": "off", // Allow process.env access
    },
  },
];
