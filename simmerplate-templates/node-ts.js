const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

async function convertBackendToTypeScript() {
  console.log("Converting backend to TypeScript...");

  const backendDir = path.join(__dirname, "../backend/");
  const rootDir = path.join(__dirname, "../");

  // 1. Install TypeScript dependencies
  console.log("Installing TypeScript dependencies for backend...");
  const dependencies = [
    "typescript",
    "@types/node",
    "@types/express",
    "@types/express-rate-limit",
    "ts-node",
    "nodemon",
    "typescript-eslint",
  ];

  try {
    execSync(`npm install --save-dev ${dependencies.join(" ")}`, {
      stdio: "inherit",
      cwd: rootDir,
    });
  } catch (error) {
    console.error("Failed to install dependencies:", error);
    return;
  }

  // 2. Create tsconfig.json for backend
  const tsConfig = {
    compilerOptions: {
      target: "es2016",
      module: "commonjs",
      outDir: "./dist",
      rootDir: "./src",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ["src"],
    exclude: ["node_modules", "dist"],
  };

  await fs.writeFile(
    path.join(backendDir, "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2)
  );

  // 3. Update backend eslint.config.js
  const eslintConfig = `import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Backend files
    files: ["src/**/*.ts"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off", // Allow console for server-side logging
      "no-process-env": "off", // Allow process.env access
    },
  }
);
`;
  await fs.writeFile(
    path.join(backendDir, "lint/eslint.config.js"),
    eslintConfig
  );

  // 4. Convert server.js to server.ts
  const serverTsContent = `import express, { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import "dotenv/config";

const app = express();
const port = 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api", limiter);

// Hello world endpoint
app.get("/api/hello", (req: Request, res: Response) => {
    res.json({ message: "Hello frontend!" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something broke!",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

app.listen(port, () => {
    console.log(\`App is running on http://localhost:\${port}\`);
});
`;

  await fs.writeFile(path.join(backendDir, "src/server.ts"), serverTsContent);
  await fs.unlink(path.join(backendDir, "src/server.js"));

  // 5. Update package.json scripts
  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

  packageJson.scripts["dev-server"] =
    "nodemon --watch 'backend/src/**/*.ts' --exec ts-node backend/src/server.ts";
  packageJson.scripts["build:server"] = "tsc -p backend";
  packageJson.scripts["start:server"] =
    "npm run build:server && node backend/dist/server.js";
  packageJson.scripts["lint:server"] =
    "eslint --config backend/lint/eslint.config.js 'backend/src/**/*.ts'";

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("Backend TypeScript conversion complete!");
  console.log("You can now run 'npm run dev-server' to start the backend.");
}

convertBackendToTypeScript().catch(console.error);
