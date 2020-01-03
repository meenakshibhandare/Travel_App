//import {app} from './server_app.js';-> throwing erro : "SyntaxError: Cannot use import statement outside a module"
const app = require('./server_app');

const port = 3500;
// Setup Server
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}


