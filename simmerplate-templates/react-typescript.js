const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

async function convertToTypeScript() {
  const frontendDir = path.join(__dirname, "../frontend/");

  // 1. Install TypeScript dependencies
  console.log("Installing TypeScript dependencies...");
  const dependencies = [
    "react",
    "react-dom",
    "typescript",
    "@types/react",
    "@types/react-dom",
    "@babel/preset-typescript",
    "@babel/preset-react",
  ];

  try {
    execSync(`npm install --save-dev ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to install dependencies:", error);
    return;
  }

  // 2. Update Babel config
  const babelConfig = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "defaults",
        },
      ],
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
      "@babel/preset-typescript",
    ],
  };

  await fs.writeFile(
    path.join(frontendDir, "webpack/babel.config.js"),
    `module.exports = ${JSON.stringify(babelConfig, null, 2)};`
  );

  // 3. Create tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "es6"],
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noFallthroughCasesInSwitch: true,
      module: "esnext",
      moduleResolution: "node",
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
    },
    include: ["src"],
  };

  await fs.writeFile(
    path.join(frontendDir, "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2)
  );

  // 4. Create components directory
  const componentsDir = path.join(frontendDir, "src/components");
  await fs.mkdir(componentsDir, { recursive: true });

  // 5. Create App component
  const buttonComponent = `import React from "react";
import "../css/app.css";

const TestButton: React.FC = () => {
    const handleClick = async () => {
        try {
            const response = await fetch("/api/hello");
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
      <button onClick={handleClick}>
        Test API Connection
      </button>
    );
};

export default TestButton;
`;

  await fs.writeFile(
    path.join(componentsDir, "TestButton.tsx"),
    buttonComponent
  );

  // 6. Create main app.tsx
  const mainAppContent = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TestButton from "./components/TestButton";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
      <div className="container">
        <h1 id="title">Simmerplate 🍳<br />(React, TypeScript)</h1>
        <TestButton />
      </div>
    </StrictMode>
);
`;

  // Remove old app.js if it exists and create new app.tsx
  try {
    await fs.unlink(path.join(frontendDir, "src/app.js"));
  } catch (error) {
    // Ignore if file doesn't exist
  }

  await fs.writeFile(path.join(frontendDir, "src/app.tsx"), mainAppContent);

  // 7. Remove dom elements from index.html
  const indexHtmlPath = path.join(frontendDir, "dist/index.html");
  let indexHtml = await fs.readFile(indexHtmlPath, "utf-8");
  indexHtml = indexHtml.replace(/<div class="container">[\s\S]*?<\/div>/gm, ``);
  fs.writeFile(indexHtmlPath, indexHtml);

  // 8. Update webpack config to handle TypeScript
  const webpackConfigPath = path.join(frontendDir, "webpack/webpack.config.js");
  let webpackConfig = await fs.readFile(webpackConfigPath, "utf8");

  webpackConfig = webpackConfig.replace(
    `app: "./frontend/src/app.js"`,
    `app: "./frontend/src/app.tsx"`
  );
  webpackConfig = webpackConfig.replace(
    `test: /\\.js$/,`,
    `test: /\\.(js|jsx|ts|tsx)$/,`
  );
  // Add TypeScript extensions to resolve
  webpackConfig = webpackConfig.replace(
    /(module: {[\s\S]*},)(\s*optimization)/,
    `$1
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    $2`
  );

  // 9. Update test pattern for babel-loader
  webpackConfig = webpackConfig.replace(
    /test: \/\.js\$/,
    "test: /\\.(js|jsx|ts|tsx)$/"
  );

  await fs.writeFile(webpackConfigPath, webpackConfig);

  console.log("TypeScript conversion complete! Please run:");
  console.log("1. npm run dev-server (if you're not already)");
  console.log("2. npm run dev");
}

convertToTypeScript().catch(console.error);
