const Server = require('./handlerequest.js');
const DataHandeler = require('./dataHandler.js');
 
//let dataHandeler = new DataHandeler();

let server = new Server();
server.start();


