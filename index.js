const server = require("./api/server.js");
//const postServer = require("./api/postServer.js");

//server.use(postServer);

server.listen(5000, () => console.log("server on port 5k"));
