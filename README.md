# Simmerplate 🍳

## Install with npx

```bash
npx create-simmerplate my-project
```

## A bare-minimum fullstack web app boilerplate setup for quick prototyping

Simmerplate sets up everything you need to get started with a fullstack web app. Simply run the commands and start coding.

Javascript files in the `frontend/src/js` directory and CSS files in the `frontend/src/css` directory are bundled by webpack and served as single javascript and css files respectively in the `frontend/dist/js` and `frontend/dist/css` directories.

`index.html` in the `frontend/dist` directory is the entry point for the app. It imports the bundled javascript and css files.

The template is intentionally using vanilla javascript and css, so you can expand it with your own libraries and frameworks.

## Features

-   Node.js server
    -   Express
    -   Rate limiting
    -   Statically serving the frontend/dist directory
    -   Error handling middleware
    -   Simple hello world GET endpoint
-   Browser-sync
    -   Proxies the served app on the local network, for easy mobile development (check the IPs in the terminal when running `npm run dev`)
    -   Automatically reloads the browser when files change (aka. hot reloading)
-   Webpack
    -   Bundling javascript and css files
    -   Hot reloading
-   Babel
-   ESLint
    -   Linting for both frontend and backend files
-   Prettier

## Usage
Run both back-end and front-end in two separate terminals.

Front-end:
```bash
npm run dev
```

Back-end:
```bash
npm run dev-server
```

## Debugging

### Back-end
A debug launch config is included for VSCode, start it by pressing F5.

### Front-end
Use chrome devtools to debug the front-end.

## Building front-end for production:

```bash
npm run build
```


## Project Structure
```
project-root/
├── frontend/
│ ├── src/
│ │ ├── css/
│ │ │ └── app.css                       # Main stylesheet
│ │ │
│ │ └── app.js                          # Main JavaScript entry
│ │
│ ├── dist/
│ │ ├── css/                            # Bundled CSS output
│ │ ├── js/                             # Bundled JS output
│ │ └── index.html                      # Main HTML entry
│ │
│ └── webpack/
│   ├── webpack.config.js               # Webpack configuration
│   ├── babel.config.js                 # Babel configuration
│   ├── eslint.config.js                # Frontend ESLint configuration
│   ├── clean-dist.js                   # Script to clean the dist directory
│   └── update-index.js                 # Script to update the index.html file with new bundle files
│
├── backend/
│ ├── src/
│ │ └── server.js                       # Express.js server
│ │
│ ├── lint/
│ │ └── eslint.config.js                # Backend ESLint configuration
│ │
│ └── .env
│
├── .vscode/
│ └── launch.json                       # Debug configuration
│
└── package.json
```

## Templates

Simmerplate comes with additional templates to customize your setup:

### React + TypeScript Template

Convert your project to use React with TypeScript:

```bash
node simmerplate-templates/react-typescript.js
```

This template will:
- Install TypeScript and React dependencies
- Configure Babel for TypeScript and React
- Create a `tsconfig.json` with optimal settings
- Convert the main app to React components
- Set up a sample `TestButton` component
- Update webpack configuration for TypeScript files

After running the template:
1. Start the dev server: `npm run dev-server`
2. Start the frontend build: `npm run dev`

The React + TypeScript template maintains all the core features (hot reloading, bundling, etc.) while providing type safety and modern React development patterns.