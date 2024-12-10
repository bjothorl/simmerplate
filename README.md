# Simmerplate 🍳

## A bare-minimum fullstack web app boilerplate setup for quick prototyping

Simmerplate sets up everything you need to get started with a fullstack web app. Simply run the commands and start coding.

Javascript files in the `frontend/src/js` directory are bundled by webpack and served as a single javascript file in the `frontend/dist` directory. CSS files in the `frontend/src/css` directory are bundled by webpack and served as a single css file in the `frontend/dist` directory.

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