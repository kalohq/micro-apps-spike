## Starting the app

Prerequisites:

* nvm
* npm

Switch to correct version of node:

    nvm install

Install dependencies:

    npm install

Start the micro-app:

    npm start

You can now access the app directly at http://localhost:9977

## Embedding the app in another one

Prerequisites:

* Chrome (we use new and stable DOM APIs with battle-tested polyfills available)

Put this in the `<head>`:

    <script src="http://localhost:9977/my-experience.js"></script>

Finally, add this element to your DOM:

    <my-experience />
